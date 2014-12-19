var KEY = { ENTER: 13, ESC: 27, SPACE: 32, PAGEUP: 33, PAGEDOWN: 34, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

Input = function (render) {
    this.render = render; //Input probably needs renderer object when clicks are involved
    this.render.canvas.addEventListener('click', this.handleClick.bind(this), false); //Add click-listener to the canvas, and set the this-scope to the Input Object (http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

    document.addEventListener('keydown', function (ev) { return onkey(ev, ev.keyCode, true); }, false);
    document.addEventListener('keyup', function (ev) { return onkey(ev, ev.keyCode, false); }, false);


    //The state object holding relevant input infornation
    this.inputState = {
        //... Input-State information here

        reset: function () {
            //Reset the state information
        }
    }
}

Input.prototype = {
    handleClick: function (e) {
        /*
            Update InputState
            
            Interesting 
            e.pageX: X-ccordinate of the page
            e.pageY: X-ccordinate of the page

            Use Canvas.offset.left and Canvas.offset.top to get coordinates on canvas
            e.pageX - this.render.canvas.offset.left;
            e.pageY - this.render.canvas.offset.top;
        */
    },

    onkey: function (ev, key, down) {
        switch (key) {
            case KEY.LEFT:  /* Update inputState*/ return false;
            case KEY.RIGHT: /* Update inputState*/ return false;
            case KEY.SPACE: /* Update inputState*/ return false;
        }
    }
}