Sprite = function () {
    this.ctxSprites;
}

Sprite.prototype = {
    init: function (spriteUrl, callBack) {
        var spriteImage = document.createElement('img');
        spriteImage.addEventListener('load', function () {
            callBack(spriteImage);
        }, false);
        spriteImage.src = spriteUrl;

        this.ctxSprites = document.createElement('canvas').getContext('2d');
        this.ctxSprites.canvas.width = spriteImage.width;
        this.ctxSprites.canvas.height = spriteImage.height;
        this.ctxSprites.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, 0, 0, spriteImage.width, spriteImage.height);
    },
    sprite: function (sprite, cell) {
        var f = sprite.f ? (Math.floor((sprite.fps / this.fps) * this.frame) % sprite.f) : 0;
        this.ctx.drawImage(this.ctxSprites.canvas, (sprite.x + f) * 32, sprite.y * 32, 32, 32, cell.p.x * this.dx, (1 + cell.p.y) * this.dy, this.dx, this.dy); // auto scaling here from 32/32 to dx/dy can be slow... we should optimize and precatch rendered sprites at exact cell size (dx,dy)
    },
}