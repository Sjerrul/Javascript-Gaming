Simon = function (centerX, centerY) {
    this.helper = new Helper();

    this.colors = ["Red", "Blue", "Yellow", "Green"];
    this.guess = [];
    this.level = 0;

    this.quadrants = {
        array: [
            {isHighlighted: false},
            {isHighlighted: false},
            {isHighlighted: false},
            {isHighlighted: false},
        ],

        highlight: function (i) {
            this.reset();
            this.array[i].isHighlighted = true;
        },
        
        reset: function () {
            for (var i in this.array) {
                this.array[i].isHighlighted = false;
            }
        }
    }
};

Simon.prototype = {
    reset: function () {
        this.guess = [];
        this.level = 0;
        this.quadrants.reset();

        var newGuess = this.helper.randomIntInclusive(0, 3);
        this.guess.push(newGuess);
    },

    goToNextLevel: function () {
        var newGuess = this.helper.randomIntInclusive(0, 3);
        this.guess.push(newGuess);
        this.level++;
    }
}