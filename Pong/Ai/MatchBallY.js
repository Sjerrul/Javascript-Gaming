var MatchBallY = function (game, paddle) {
    this.game = game;
    this.paddle = paddle;
    
    this.inputState = {
        upPressed: false,
        downPressed: false,

        reset: function () {
            this.upPressed = false;
            this.downPressed = false;
        }
    }
};

MatchBallY.prototype = {
    update: function () {
        var ballY = this.game.ball.y;
        if (this.getPaddleCenterline() == ballY) {
            this.inputState.reset();
            return;
        }

        if (this.getPaddleCenterline() > ballY) {
            this.inputState.upPressed = true;
            this.inputState.downPressed = false;
        } else {
            this.inputState.upPressed = false;
            this.inputState.downPressed = true;
        }

    },

    getPaddleCenterline: function () {
        return this.paddle.y + (SETTINGS.PADDLEHEIGHT / 2);
    }
}