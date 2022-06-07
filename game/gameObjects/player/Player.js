import GameObject from "../GameObject.js";
import Vect2 from "../../../Vect2.js";
import { serialize } from "../../serialize/serialize.js";

const Keys = {
	up: "KeyW",
	down: "KeyS",
	left: "KeyA",
	right: "KeyD",
};

const fieldsNotSerializeable = {
	size: "size",
};
const replacer = (key, value) => {
	if (fieldsNotSerializeable[key]) return undefined;
	else if (key === "pos") return { x: value.x, y: value.y };
	else return value;
};

export default class Player extends GameObject {
	constructor(x, y, width, height) {
		super(x, y, width, height);
		this.color = "blue";
		this.speed = 5;
		this.getKey = null;
		// this.velocity = new Vect2(5, 5);
	}

	serialized() {
		return serialize(this, replacer);
	}

	load(loadedData) {
		console.log(loadedData);
		console.log(this);
		this.pos.x = loadedData.pos.x;
		this.pos.y = loadedData.pos.y;
	}

	render(Draw) {
		Draw.fill = this.color;
		Draw.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, true);
	}

	moveUp(moveAmount) {
		const dir = Vect2.up;
		moveAmount.add(dir);
	}

	moveDown(moveAmount) {
		const dir = Vect2.down;
		moveAmount.add(dir);
	}

	moveLeft(moveAmount) {
		const speed = Vect2.left;
		moveAmount.add(speed);
	}

	moveRight(moveAmount) {
		const dir = Vect2.right;
		moveAmount.add(dir);
	}

	move(input) {
		// input;
		const moveDir = new Vect2(0, 0);
		if (this.getKey(Keys.up)) this.moveUp(moveDir);
		if (this.getKey(Keys.down)) this.moveDown(moveDir);
		if (this.getKey(Keys.left)) this.moveLeft(moveDir);
		if (this.getKey(Keys.right)) this.moveRight(moveDir);

		this.pos.add(moveDir.mult(this.speed));
	}

	update(input) {
		this.move(input);
	}
}
