function Queue () {
    this.array = [];
}

Queue.prototype = {
    enqueue: function (object) {
        this.array.push(object);
    },

    dequeue: function () {
        if (this.isEmpty()) {
            throw new Error("Cannot dequeue, queue is empty");
        }
        return this.array.shift();
    },

    peek: function () {
        if (this.isEmpty()) {
            return null;
        }
        return this.array[0];
    },

    isEmpty: function () {
        return this.array.length === 0;
    },

    toString: function () {
        return this.array.join(", ");
    }
}