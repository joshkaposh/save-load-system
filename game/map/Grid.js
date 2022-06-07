import GridNode from "./GridNode.js";
import { serializeArray } from "../serialize/serialize.js";

const fieldsNotSerializeable = {
	x: "x",
	y: "y",
	tilesize: "tilesize",
	col: "col",
	row: "row",
};

const gridNodeReplacer = (key, value) => {
	// || key === "x" || key === "y" || key === "tilesize" || key === "col" || key === "row"
	if (key === "neighbours" || fieldsNotSerializeable[key]) return undefined;
	else return value;
};

export default class Grid {
	#grid = [];
	constructor(width, height, cols, rows, tilesize) {
		this.width = width;
		this.height = height;
		this.tilesize = tilesize;
		this.cols = cols;
		this.rows = rows;
		this.generate();
	}

	get grid() {
		return this.#grid;
	}

	serialized() {
		const temp = serializeArray(this.#grid, gridNodeReplacer);
		console.log(temp);
		return temp;
	}

	addTileNeighbours() {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				this.getTile(col, row).addNeighbours(this.cols, this.rows, this.getTile.bind(this));
			}
		}
	}

	generate() {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				this.#grid.push(new GridNode(col * this.tilesize, row * this.tilesize, col, row, this.tilesize));
			}
		}

		this.addTileNeighbours();
	}

	loadSavedNode(node) {
		node.type = type;
		node.color = color;
		node.towerId = towerId;
	}

	generateSavedMap(savedMap) {
		console.log("Generating Saved Map!");
		console.log(savedMap);
		// this.#grid.length = 0;

		for (let i = 0; i < savedMap.length; i++) {
			const savedNode = savedMap[i];
			const gridNode = this.#grid[i];
			gridNode.color = savedNode.color;
			gridNode.towerId = savedNode.towerId;
		}

		this.addTileNeighbours();
	}

	reset() {
		this.#grid.length = 0;
		this.generate();
	}

	getTileXY(x, y) {
		let col = Math.floor(x / this.tilesize);
		let row = Math.floor(y / this.tilesize);
		return this.#grid[row * this.cols + col];
	}

	getTile(col, row) {
		return this.#grid[row * this.cols + col];
	}
}
