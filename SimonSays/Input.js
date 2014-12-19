Input = function (render) {
    this.render = render;
    this.render.canvas.addEventListener('click', this.handleClick.bind(this), false); //Add click-listener to the canvas, and set the this-scope to the Input Object (http://ryanmorr.com/understanding-scope-and-context-in-javascript/)


    //The state object holding relevant input infornation
    this.clicked = {
        pageX: null, canvasX: null,
        pageY: null, canvasY: null,

        clickedInCircle: false,
        quadrantClicked: null,

        reset: function () {
            this.pageX = null;
            this.pageY = null;
            this.canvasX = null;
            this.canvasY = null;
            this.clickedInCircle = false;  
            this.quadrantClicked = null;
        }
    }
}

Input.prototype = {
    handleClick: function (e) {
        this.clicked.pageX = e.pageX;
        this.clicked.pageY = e.pageY;
        this.clicked.canvasX = e.pageX - this.render.canvas.offset.left;
        this.clicked.canvasY = e.pageY - this.render.canvas.offset.top;

        var distanceFromX = (this.render.simonPosition.x - this.clicked.canvasX) * (this.render.simonPosition.x - this.clicked.canvasX);
        var distanceFromY = (this.render.simonPosition.y - this.clicked.canvasY) * (this.render.simonPosition.y - this.clicked.canvasY);
        this.clicked.clickedInCircle = Math.sqrt(distanceFromX + distanceFromY) < this.render.simonRadius;

        var quadrant = null;
        if (this.clicked.clickedInCircle) {
            if (this.clicked.canvasX - this.render.simonPosition.x >= 0) {
                quadrant = (this.clicked.canvasY - this.render.simonPosition.y >= 0) ? 0 : 3;
            } else {
                quadrant = (this.clicked.canvasY - this.render.simonPosition.y >= 0) ? 1 : 2;
            }
        }

        this.clicked.quadrantClicked = quadrant;
    }
}