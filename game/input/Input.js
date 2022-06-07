export default class Input {
	#keys = {};
	#lastKey = null;

	constructor() {
		window.addEventListener("keydown", (e) => {
			this.#keys[e.code] = true;
			this.#lastKey = e.code;
		});

		window.addEventListener("keyup", (e) => {
			delete this.#keys[e.code];
		});
	}

	getKey(key) {
		if (!this.#keys[key]) return null;
		return this.#keys[key];
	}

	get keys() {
		return this.#keys;
	}

	get lastKey() {
		return this.#lastKey;
	}
}
