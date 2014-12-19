var Game = function () {
    this.storage = window.localStorage || {};

    this.frameCounter = 0;
    this.fps = 10;             // how many game frames per second
    this.step = 1 / this.fps;  // how long is each game frame (in seconds)

    this.score = 0;
    
    //...Additional classes
};

Game.prototype = {
    reset: function (n) {
        this.score = 0;
    },

    update: function () {
        this.initializeFrame();

        //Get Input
        //Update Game
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