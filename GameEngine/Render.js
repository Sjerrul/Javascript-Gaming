function Render(game) {
    this.game = game;
    this.canvas = Dom.get('canvas');
    this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
    this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.ctx = this.canvas.getContext('2d');
    this.fps = 30;
    this.step = 1 / this.fps;
    this.frame = 0;

    //game.subscribe('level', this.onChangeLevel,   this);
}

Render.prototype = {
    reset: function () {
        this.canvas = Dom.get('canvas');
        this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
        this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.ctx = this.canvas.getContext('2d');
        this.fps = 30;
        this.step = 1 / this.fps;
        this.frame = 0;
        this.resize();
    },

    update: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.frame++;

        //Draw all the needed sprites and objects here

        this.ctx.restore();
    },

    resize: function () {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}