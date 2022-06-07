import Vect2 from "../../Vect2.js";
import { pointRect } from "../collision/collision.js";

const getMousePos = (e, rect) => {
	return new Vect2(e.clientX - rect.left, e.clientY - rect.top);
};

export default class Mouse {
	#canvas;
	#getTile;
	#interact;
	constructor(canvas, canvasSize, getTile, interactWithTile) {
		this.#canvas = canvas;
		this.canvasSize = canvasSize;
		this.#getTile = getTile;
		this.#interact = interactWithTile;
		this.bounds = this.pos = new Vect2(0, 0);
		this.selected = null;
		this.action = null;
		const selectTile = (e) => {
			this.pos.set(getMousePos(e, this.#canvas.getBoundingClientRect()));
			const tile = this.#getTile(this.pos.x, this.pos.y);
			if (pointRect(this.pos, this.canvasSize) && tile) {
				if (this.selected) {
					this.selected.highlight = false;
				}
				this.selected = tile;
				return;
			}
			this.selected = null;
		};
		// ? inside of canvas

		window.addEventListener("mousemove", (e) => {
			selectTile(e);
			if (this.selected) {
				this.selected.highlight = true;
			}
		});

		window.addEventListener("mousedown", (e) => {
			selectTile(e);
			if (this.selected) {
				this.#interact(this.selected);
			}
		});
	}

	setAction(action) {
		// console.log("Setting action: ", action.target.value);
		this.action = action.target.value;
	}
}
