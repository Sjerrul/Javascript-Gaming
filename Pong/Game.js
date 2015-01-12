var Game = function () {
    this.storage = window.localStorage || {};

    this.frameCounter = 0;
    this.fps = 60;             // how many game frames per second
    this.step = 1 / this.fps;  // how long is each game frame (in seconds)

    this.score = 0;
    
    //...Additional classes
    this.input = new Input();
    this.playerPaddle = new Paddle(10);
    this.enemyPaddle = new Paddle(300/*canvaswidth*/ - 10/*offset*/ - 15/*paddleSize*/);
    this.ball = new Ball();
};

Game.prototype = {
    reset: function (n) {
        this.score = 0;
    },

    update: function () {
        this.initializeFrame();

        this.playerPaddle.update(this.input.inputState);
        this.enemyPaddle.update();
        this.ball.update();
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