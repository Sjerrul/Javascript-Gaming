var Paddle = function (x, ball, side) {
    this.WIDTH = SETTINGS.PADDLEWIDTH;
    this.HEIGHT = SETTINGS.PADDLEHEIGHT;
    this.SPEED = SETTINGS.PADDLESPEED;
    this.BEHAVIOUR = null;

    this.ball = ball;
    this.side = side;

    this.x = x;
    this.y = 30; //top

   
};

Paddle.prototype = {
    draw: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.WIDTH, this.HEIGHT);
        ctx.fillStyle = "white";
        ctx.fill();
    },

    update: function (inputState) {
        if (this.BEHAVIOUR === null) {
            this.handleInput(inputState);      
        } else {
            this.BEHAVIOUR.update();
            this.handleInput(this.BEHAVIOUR.inputState);
        }

        this.handleBallHit();
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
    },

    setAI: function (behaviour) {
        this.BEHAVIOUR = behaviour;
    }
}