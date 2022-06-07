import Vect2 from "../../Vect2.js";

export default class GameObject {
	constructor(x, y, width, height) {
		this.pos = new Vect2(x, y);
		this.size = new Vect2(width, height);
		// this.components = [];
	}
	// addComponent()
}
