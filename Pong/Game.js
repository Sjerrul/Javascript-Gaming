var SIDE = {
    LEFT: 0,
    RIGHT: 1
}

var SETTINGS = {
    GAMEWIDTH: 500,
    GAMEHEIGHT: 200,
    PADDLEOFFSET: 10,
    PADDLEWIDTH: 15,
    PADDLEHEIGHT: 80,
    PADDLESPEED: 4,
    BALLSPEED: 4,
    BALLSIZE: 15,
}

var Game = function () {
    this.storage = window.localStorage || {};

    this.frameCounter = 0;
    this.fps = 60;             // how many game frames per second
    this.step = 1 / this.fps;  // how long is each game frame (in seconds)

    this.score = { left: 0, right: 0 };
    
    //...Additional classes
    this.input = new Input();
    this.ball = new Ball();
    this.playerPaddle = new Paddle(10, this.ball, SIDE.LEFT);
    this.enemyPaddle = new Paddle(SETTINGS.GAMEWIDTH - SETTINGS.PADDLEOFFSET - 15/*paddleSize*/, this.ball, SIDE.RIGHT);

};

Game.prototype = {
    reset: function (n) {
        this.score = { left: 00, right: 0 };
        this.ball.reset();
    },

    update: function (dt) {
        this.initializeFrame();

        this.playerPaddle.update(this.input.inputState);
        this.enemyPaddle.update();
        this.ball.update();
        
        var exit = null;;
        if (this.ball.x < 0) {
            exit = SIDE.LEFT;
        }

        if (this.ball.x > SETTINGS.GAMEWIDTH) {
            exit = SIDE.RIGHT;
        }

        if (exit !== null) {
            if (exit === SIDE.LEFT) {
                this.score.right++;
            }

            if (exit === SIDE.RIGHT) {
                this.score.left++;
            }

            this.ball.reset(exit);
        }        
    },

    initializeFrame: function () {
        this.frameCounter++;
    },

    subscribe: function (event, callback, target) {
        this.subscribers = this.subscribers || {};
        this.subscribers[event] = this.subscribers[event] || [];
        this.subscribers[event].push({ callback: callback, target: target });
    },

    publish: function (event) {
        if (this.subscribers && this.subscribers[event]) {
            var subs = this.subscribers[event];
            var args = [].slice.call(arguments, 1);
            var n, sub;
            for (n = 0 ; n < subs.length ; ++n) {
                sub = subs[n];
                sub.callback.apply(sub.target, args);
            }
        }
    }
}