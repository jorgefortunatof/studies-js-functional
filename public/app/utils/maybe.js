export class Maybe {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }

    map(fn) {
        if (this.isNothing()) return Maybe.of(null);

        const value = fn(this._value);
        return Maybe.of(value);
    }

    get() {
        return this._value;
    }

    getOrElse(value) {
        return this.isNothing() ? value : this._value;
    }
}
