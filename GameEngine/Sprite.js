var SPRITES = {
    ROCKFORDLEFT: { row: 4, col: 0, frames: 8, fps: 20 },
    ROCKFORDRIGHT: { row: 5, col: 0, frames: 8, fps: 20 },
    EXPLOSION: { row: 0, col: 1, frames: 3, fps: 1 }
}

Sprite = function () {
    this.ctxSprites;
    this.spriteSize = 32;
}

Sprite.prototype = {
    init: function (spriteUrl, callBack) {
        var spriteImage = document.createElement('img');
        var me = this;
        spriteImage.addEventListener('load', function () {
            me.ctxSprites.canvas.width = this.width;
            me.ctxSprites.canvas.height = this.height;
            me.ctxSprites.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, 0, 0, spriteImage.width, spriteImage.height);


            callBack(spriteImage);
        }, false);
        spriteImage.src = spriteUrl;
        this.ctxSprites = document.createElement('canvas').getContext('2d');
    },

    draw: function (drawingContext, spriteCol, spriteRow, x, y) {        
        drawingContext.drawImage(this.ctxSprites.canvas, spriteCol * this.spriteSize, spriteRow * this.spriteSize, this.spriteSize, this.spriteSize, x, y, this.spriteSize, this.spriteSize);
    },

    drawAnimated: function (drawingContext, x, y, sprite, fps, frame) {
        var f = sprite.frames ? (Math.floor((sprite.fps / fps) * frame) % sprite.frames) : 0;
        drawingContext.drawImage(this.ctxSprites.canvas, (sprite.col + f) * this.spriteSize, sprite.row * this.spriteSize, this.spriteSize, this.spriteSize, x, y, this.spriteSize, this.spriteSize);
    },
}