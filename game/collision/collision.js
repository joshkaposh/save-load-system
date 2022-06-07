import Vect2 from "../../Vect2.js";

export class Rectangle {
	constructor(x, y, width, height) {
		this.pos = new Vect2(x, y);
		this.size = new Vect2(width, height);
	}
}

export const pointRect = (p, rect) => {
	return p.x >= rect.pos.x && p.x <= rect.pos.x + rect.size.x && p.y >= rect.pos.y && p.y <= rect.pos.y + rect.size.y;
};
