Sound = function () {
    this._soundDirectory = "/Sounds/";
    this._sounds = {
        "beep": {
            file: this._soundDirectory + "beep.wav"
        },
        "ok": {
            file: this._soundDirectory + "ok1.wav"
        },
        "ok2": {
            file: this._soundDirectory + "ok2.wav"
        },
        "sweep": {
            file: this._soundDirectory + "electrical_sweep.wav"
        },
        "buzzer": {
            file: this._soundDirectory + "buzzer.wav"
        },
    }
}

Sound.prototype = {
    play: function (soundName) {
        if (!this._sounds[soundName]) {
            throw new Error("Unable to play sound '" + soundName + "'. No sound by that name found")
        }
        var fileName = this._sounds[soundName].file;
        var sound = new Audio(fileName); 
        sound.play();
    }
}