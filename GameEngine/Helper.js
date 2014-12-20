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

    aabbIntersect: function (ax, ay, aw, ah, bx, by, bw, bh) { //Axis-aligned Bounding Box
        return (ax < bx + bw) && (ay < by + bh) && (bx < ax + aw) && (by < ay + ah);
    }

    //clamp: function () {
    //    var x = Math.min(Math.max(a, b), c);


    //}
}