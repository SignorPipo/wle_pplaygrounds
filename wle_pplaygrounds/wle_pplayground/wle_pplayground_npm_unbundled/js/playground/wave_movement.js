WL.registerComponent("wave-movement", {
}, {
    init() {
    },
    start() {
        this._myStartPosition = this.object.pp_getPosition();

        this._myCurrentTimes = [0, 0, 0];

        this._myChangeParamsTimers = [new PP.Timer(3), this._randomTimer(), this._randomTimer()];

        this._mySpeedMultipliers = [this._randomSpeedMultiplier(), this._randomSpeedMultiplier(), this._randomSpeedMultiplier()];

        this._myMaxDistanceMiddles = [3, 1, 0.5];
        this._myMaxDistances = [this._randomMaxDistance(this._myMaxDistanceMiddles[0]), this._randomMaxDistance(this._myMaxDistanceMiddles[1]), this._randomMaxDistance(this._myMaxDistanceMiddles[2])];

        this._myMaxDistanceTargets = this._myMaxDistances.pp_clone();
        this._mySpeedMultiplierTargets = this._mySpeedMultipliers.pp_clone();

        this._myRandomSigns = [Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1), Math.pp_randomPick(-1, 1)];
    },
    update(dt) {
        for (let i = 0; i < this._myCurrentTimes.length; i++) {
            this._myCurrentTimes[i] += dt * this._mySpeedMultipliers[i];
        }

        this.object.pp_setPosition(this._myStartPosition);
        this.object.pp_translateObject([
            Math.sin(this._myCurrentTimes[0]) * this._myMaxDistances[0] * this._myRandomSigns[0],
            Math.sin(this._myCurrentTimes[1]) * this._myMaxDistances[1] * this._myRandomSigns[1],
            Math.sin(this._myCurrentTimes[2]) * this._myMaxDistances[2] * this._myRandomSigns[2]
        ]);

        for (let i = 0; i < this._myChangeParamsTimers.length; i++) {
            this._myChangeParamsTimers[i].update(dt);
            if (this._myChangeParamsTimers[i].isDone()) {
                this._myChangeParamsTimers[i] = this._randomTimer();
                this._mySpeedMultiplierTargets[i] = this._randomSpeedMultiplier();
                this._myMaxDistanceTargets[i] = this._randomMaxDistance(this._myMaxDistanceMiddles[i]);
            }
        }

        for (let i = 0; i < this._mySpeedMultipliers.length; i++) {
            this._mySpeedMultipliers[i] = Math.pp_lerp(this._mySpeedMultipliers[i], this._mySpeedMultiplierTargets[i], 0.3 * dt);
        }

        for (let i = 0; i < this._myMaxDistances.length; i++) {
            this._myMaxDistances[i] = Math.pp_lerp(this._myMaxDistances[i], this._myMaxDistanceTargets[i], 0.3 * dt);
        }
    },
    _randomTimer() {
        return new PP.Timer(Math.pp_random(4, 8));
    },
    _randomSpeedMultiplier() {
        return Math.pp_random(0.5, 2);
    },
    _randomMaxDistance(middle) {
        return Math.pp_random(middle - middle / 3, middle + middle / 3);
    }
});