var Ball = function () {
    this.SIZE = 15;
    this.x = 150;
    this.y = 75;
    this.vx = 4;
};

Ball.prototype = {
    draw: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.SIZE, this.SIZE);
        ctx.fillStyle = "white";
        ctx.fill();
    },

    update: function () {
        this.x += this.vx;

        if (this.x > (300 - this.SIZE )|| this.x < 0 ) { //Hardcoded for now
            this.vx = -this.vx
        }
    }
}