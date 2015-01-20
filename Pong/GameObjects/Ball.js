var Ball = function () {
    this.SIZE = SETTINGS.BALLSIZE;

    this.x = SETTINGS.GAMEWIDTH/2;
    this.y = SETTINGS.GAMEHEIGHT / 2;
    this.vx = -SETTINGS.BALLSPEED;
    this.vy = 1;
};

Ball.prototype = {
    reset: function (sideExited) {
        this.x = SETTINGS.GAMEWIDTH / 2;
        this.y = SETTINGS.GAMEHEIGHT / 2;;
        this.vx = -SETTINGS.BALLSPEED;
        this.vy = 1;

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
        this.y += this.vy;

        if (this.y < 0 || (this.y + this.SIZE) > SETTINGS.GAMEHEIGHT) {
            this.vy = -this.vy
        }
    },

    bounce: function () {
        this.vx = -this.vx
        this.vx += (this.vx > 0) ? SETTINGS.BOUNCESPEEDINCREASE : -SETTINGS.BOUNCESPEEDINCREASE;
    }
}