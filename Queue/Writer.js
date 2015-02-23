function Writer(queue, timeout) {
    this.timeout = timeout;
    this.queue = queue;
    this.busy = false;

    this.runningTasks = 0;
    this.counter = 0;
}

Writer.prototype = {
    write: function () {
        this.runningTasks++;
        this.busy = true;

        window.setTimeout(function (me) {
            me.queue.enqueue(++me.counter);
            me.runningTasks--;

            if (me.runningTasks <= 0) {
                me.busy = false;
            }
        }, (this.runningTasks + 1) * this.timeout, this);
    }
}
