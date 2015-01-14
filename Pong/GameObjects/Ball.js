var Ball = function () {
    this.SIZE = SETTINGS.BALLSIZE;

    this.x = 150;
    this.y = 75;
    this.vx = 4;
};

Ball.prototype = {
    reset: function () {
        this.x = 150;
        this.y = 75;
        this.vx = 4;
    },

    draw: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.SIZE, this.SIZE);
        ctx.fillStyle = "white";
        ctx.fill();
    },

    update: function () {
        this.x += this.vx;
    },

    bounce: function () {
        this.vx = -this.vx
    }
}