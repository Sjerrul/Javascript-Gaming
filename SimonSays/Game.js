SimonSays = function () {
    var STATE = {
        SHOW: 0x01,
        PLAY: 0x02,
    }

    function timestamp() {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        }
        return new Date().getTime();
    };

    if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                       window.mozRequestAnimationFrame ||
                                       window.oRequestAnimationFrame ||
                                       window.msRequestAnimationFrame ||
                                       function (callback, element) {
                                           window.setTimeout(callback, 1000 / 60);
                                       }
    }

    var Game = function () {
        this.storage = window.localStorage || {};

        this.frameCounter = 0;
        this.fps = 1;             // how many game frames per second
        this.step = 1 / this.fps;  // how long is each game frame (in seconds)

        this.score = 0;
        this.simon = new Simon();

        this.state = STATE.SHOW;
        this.guessIndex = 0;
    };

    Game.prototype = {
        reset: function (n) {
            this.simon.reset();

            this.guessIndex = 0;
            this.changeToGameState(STATE.SHOW);
        },

        setGameFps: function(fps) {
            this.fps = fps;
            this.step = 1 / this.fps;
        },

        update: function () {
            this.initializeFrame();

            if (this.state === STATE.SHOW) {                
                var quadrantToHighlight = this.getNextQuadrantToHighlight();
                if (quadrantToHighlight === null) {
                    this.changeToGameState(STATE.PLAY);
                    return;
                }
                this.simon.quadrants.highlight(quadrantToHighlight);
            }

            if (this.state === STATE.PLAY) {
                if (input.clicked.clickedInCircle) {
                    if (input.clicked.quadrantClicked !== this.simon.guess[this.guessIndex]) {
                        this.publish("gameOver");
                        this.simon.reset();
                        this.changeToGameState(STATE.SHOW);
                    } else {
                        this.guessIndex++;

                        if (this.guessIndex >= this.simon.guess.length) {                           
                            this.simon.goToNextLevel();
                            this.changeToGameState(STATE.SHOW);
                            this.publish("levelComplete", this.simon.level);
                        }
                    }

                    input.clicked.reset();
                }


            }
        },

        changeToGameState: function (toGameState) {
            switch (toGameState) {
                case STATE.SHOW:
                    this.setGameFps(1);
                    break;
                case STATE.PLAY:
                    this.setGameFps(10);
                    break;
                default:
                    throw new Error("Cannot switch to unknown game state: " + toGameState);
            }

            this.guessIndex = 0;
            input.clicked.reset();
            this.simon.quadrants.reset();

            this.state = toGameState;
        },

        getNextQuadrantToHighlight: function () {
            if (this.guessIndex >= this.simon.guess.length) {
                return null;
            }

            var quadrantToGuess = this.simon.guess[this.guessIndex];
            this.guessIndex++;
            return quadrantToGuess;
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

    var game = new Game();
    var render = new Render(game);
    var input = new Input(render, game);
    var stats = new Stats();

    return function () {
        var now, last = timestamp(), dt = 0, gdt = 0, rdt = 0;
        function frame() {
            now = timestamp();
            dt = Math.min(1, (now - last) / 1000);
            gdt = gdt + dt;
            while (gdt > game.step) {
                gdt = gdt - game.step;
                game.update();
            }
            rdt = rdt + dt;
            if (rdt > render.step) {
                rdt = rdt - render.step;
                render.update();
            }
            stats.update();
            last = now;
            requestAnimationFrame(frame, render.canvas);
        }

        render.reset();
        game.reset();

        //Start FPS counter
        stats.domElement.id = 'stats';
        Dom.get('simonsays').appendChild(stats.domElement);

        frame();//  ... and start the first frame !
    };
}()