function Render(game) {
    this.game = game;
    this.canvas = Dom.get('canvas');
    this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
    this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.simonPosition = { x: this.canvas.center.x, y: this.canvas.center.y };
    this.simonRadius = 50;
    this.ctx = this.canvas.getContext('2d');
    this.fps = 30;
    this.step = 1 / this.fps;
    this.frame = 0;

    game.subscribe('levelComplete', this.onLevelComplete, this);
    game.subscribe('gameOver', this.onGameOver, this);
}

Render.prototype = {
    reset: function () {
        this.canvas = Dom.get('canvas');
        this.canvas.offset = { left: this.canvas.offsetLeft, top: this.canvas.offsetTop };
        this.canvas.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.simonPosition = { x: this.canvas.center.x, y: this.canvas.center.y };
        this.simonRadius = 50;
        this.ctx = this.canvas.getContext('2d');
        this.fps = 30;
        this.step = 1 / this.fps;
        this.frame = 0;
        this.resize();
    },

    update: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.frame++;

        var startDegrees = 0;
        for (var i = 0; i < 4; i++) {
            var color = this.game.simon.quadrants.array[i].isHighlighted ? "#dddddd" : this.game.simon.colors[i];

            this.drawQuadrant(this.ctx, i, color);
        }

        this.ctx.restore();
    },

    drawQuadrant: function(ctx, n, color) {
        var QUADRANT_DEGREES = 90;

        var startDegrees = QUADRANT_DEGREES * n;
        var endDegrees = startDegrees + QUADRANT_DEGREES;

        var startRadians = startDegrees * Math.PI / 180;
        var endRadians = endDegrees * Math.PI / 180;

        ctx.beginPath();
        ctx.moveTo(this.simonPosition.x, this.simonPosition.y);
        ctx.arc(this.simonPosition.x, this.simonPosition.y, this.simonRadius, startRadians, endRadians);
        ctx.fillStyle = color;
        ctx.fill();
    },

    onGameOver: function () {
        Dom.get('level').innerHTML = "Level  0";
    },

    onLevelComplete: function (newLevel) {
        Dom.get('level').innerHTML = "Level  " + newLevel;
    },

    resize: function () {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}