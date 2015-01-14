function Render(game) {
    this.game = game;
    this.canvas = Dom.get('canvas');
    this.canvas.width = SETTINGS.GAMEWIDTH;
    this.canvas.height = SETTINGS.GAMEHEIGHT;

    this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
    this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.ctx = this.canvas.getContext('2d');
    this.fps = 30;
    this.step = 1 / this.fps;
    this.frame = 0;
}

Render.prototype = {
    reset: function () {
        this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
        this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    },

    draw: function (dt) {
        this.ctx.fillStyle = "black";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();

        this.ctx.save();
        this.frame++;

        //Draw all the needed sprites and objects here
        this.game.playerPaddle.draw(this.ctx);
        this.game.enemyPaddle.draw(this.ctx);
        this.game.ball.draw(this.ctx);

        this.ctx.restore();
    },
}