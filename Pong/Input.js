var KEY = { ENTER: 13, ESC: 27, SPACE: 32, PAGEUP: 33, PAGEDOWN: 34, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

Input = function () {
    document.addEventListener('keydown', this.onKey.bind(this, false), false);
    document.addEventListener('keyup', this.onKey.bind(this, true), false);


    //The state object holding relevant input infornation
    this.inputState = {
        upPressed: false,
        downPressed: false,

        reset: function () {
            this.upPressed= false;
            this.downPressed = false;
        }
    }
}

Input.prototype = {
    onKey: function (keyUp, ev) {
        if (keyUp) {
            this.inputState.reset();
            return;
        }

        switch (ev.keyCode) {
            case KEY.UP: this.inputState.upPressed = true; return false;
            case KEY.DOWN: this.inputState.downPressed = true; return false;
            case KEY.SPACE: /* Update inputState*/ return false;
        }
    }
}