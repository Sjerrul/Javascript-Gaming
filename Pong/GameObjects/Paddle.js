var Paddle = function (x, ball, side) {
    this.WIDTH = 15;
    this.HEIGHT = 80;
    this.SPEED = 4;

    this.ball = ball;
    this.side = side;

    this.x = x;
    this.y = 20; //top
};

Paddle.prototype = {
    draw: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.WIDTH, this.HEIGHT);
        ctx.fillStyle = "white";
        ctx.fill();
    },

    update: function (inputState) {
        this.handleInput(inputState);
        this.handleBallHit()
    },

    handleInput: function (inputState) {
        if (!inputState) {
            return;
        }

        if (inputState.upPressed) {
            this.y -= this.SPEED;
        }

        if (inputState.downPressed) {
            this.y += this.SPEED;
        }
    },

    handleBallHit: function () {
        if (!this.doesBallHitMe()) {
            return;
        }

        if (this.side === SIDE.LEFT) {
            if (this.ball.x < this.getBattingX()) {
                this.ball.bounce();
            }
        } 
        
        if (this.side === SIDE.RIGHT) {
            if (this.ball.x > this.getBattingX()) {
                this.ball.bounce();
            }
        }
    },

    getBattingX: function () {
        if (this.side === SIDE.LEFT) {
            return (this.x + this.WIDTH);
        }

        if (this.side === SIDE.RIGHT) {
            return (this.x - this.WIDTH);
        }

        throw new Error("Unknown side Enum:" + this.side)
    },

    doesBallHitMe: function () {
        if ((this.ball.y + this.ball.SIZE) >= this.y && this.ball.y <= (this.y + this.HEIGHT)) {
            return true;
        }

        return false;
    }
}