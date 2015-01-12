var Helper = function () {

};

Helper.prototype = {
    random: function (min, max) {
        return (min + (Math.random() * (max - min)));
    },

    randomInt: function (min, max) {
        return Math.floor(this.random(min, max));
    },

    randomIntInclusive: function (min, max) {
        return Math.floor(this.random(min, max + 1));
    },

    //clamp: function () {
    //    var x = Math.min(Math.max(a, b), c);


    //}
}