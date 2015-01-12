var Paddle = function (x) {
    this.WIDTH = 15;
    this.HEIGHT = 80;
    this.SPEED = 4;

    this.x = x;
    this.y = 10;
};

Paddle.prototype = {
    draw: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.WIDTH, this.HEIGHT);
        ctx.fillStyle = "white";
        ctx.fill();
    },

    update: function (inputState) {
        if (!inputState) {
            return;
        }

        if (inputState.upPressed) {
            this.y -= this.SPEED;
        }

        if (inputState.downPressed) {
            this.y += this.SPEED;
        }
    }
}