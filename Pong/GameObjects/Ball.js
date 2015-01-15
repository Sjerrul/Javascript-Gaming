var Ball = function () {
    this.SIZE = SETTINGS.BALLSIZE;

    this.x = SETTINGS.GAMEWIDTH/2;
    this.y = SETTINGS.GAMEHEIGHT / 2;
    this.vx = SETTINGS.BALLSPEED;
};

Ball.prototype = {
    reset: function (sideExited) {
        this.x = SETTINGS.GAMEWIDTH / 2;
        this.y = SETTINGS.GAMEHEIGHT / 2;;
        this.vx = SETTINGS.BALLSPEED;

        if (sideExited === SIDE.LEFT) {
            this.vx = -this.vx;
        }
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