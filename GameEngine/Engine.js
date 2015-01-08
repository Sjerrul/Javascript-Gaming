Engine = function () {
    function timestamp() { return new Date().getTime(); };
    function random(min, max) { return (min + (Math.random() * (max - min))); };
    function randomInt(min, max) { return Math.floor(random(min, max)); };

    if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                       window.mozRequestAnimationFrame ||
                                       window.oRequestAnimationFrame ||
                                       window.msRequestAnimationFrame ||
                                       function (callback, element) {
                                           window.setTimeout(callback, 1000 / 60);
                                       }
    }
  
    var game = new GameLogic();
    var sprite = new Sprite();
    var render = new Render(game, sprite);
    var input = new Input(game, render);
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

        //Start FPS counter
        stats.domElement.id = 'stats';
        Dom.get('stats').appendChild(stats.domElement);

        sprite.init("sprites.png", function (sprites) {
            render.reset();
            game.reset();
            frame(); //... and start the first frame!
        })

        
    };
}()