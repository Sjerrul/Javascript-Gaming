var Helper = function () {

};

Helper.prototype = {
    random: function (min, max) {
        return (min + (Math.random() * (max - min)));
    },

    randomInt: function (min, max) {
        return Math.floor(random(min, max));
    }
}