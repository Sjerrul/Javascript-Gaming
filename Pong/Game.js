var SIDE = {
    LEFT: 0,
    RIGHT: 1
}

var Game = function () {
    this.storage = window.localStorage || {};

    this.frameCounter = 0;
    this.fps = 60;             // how many game frames per second
    this.step = 1 / this.fps;  // how long is each game frame (in seconds)

    this.score = 0;
    
    //...Additional classes
    this.input = new Input();
    this.ball = new Ball();
    this.playerPaddle = new Paddle(10, this.ball, SIDE.LEFT);
    this.enemyPaddle = new Paddle(300/*canvaswidth*/ - 10/*offset*/ - 15/*paddleSize*/, this.ball, SIDE.RIGHT);

};

Game.prototype = {
    reset: function (n) {
        this.score = 0;
        this.ball.reset();
    },

    update: function (dt) {
        this.initializeFrame();

        this.playerPaddle.update(this.input.inputState);
        this.enemyPaddle.update();
        this.ball.update();
        
        if (this.ball.x < 0 || this.ball.x > 300) {
            this.ball.reset();
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