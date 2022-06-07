import Vect2 from "../../Vect2.js";
export const TYPES = {
	default: 0,
	wall: 1,
	tower: 2,
};

export const TYPE_COLORS = ["white", "grey", "orange"];

export const TILES = {
	TYPES: {
		tileTypes: TYPES,
		typeColors: TYPE_COLORS,
		size: Object.keys(TYPES).length,
	},
};

export default class GridNode {
	constructor(x, y, col, row, tilesize, type = TYPES.default, color = TYPE_COLORS[type], towerId = null) {
		this.x = x;
		this.y = y;
		this.col = col;
		this.row = row;
		this.tilesize = tilesize;
		// !serializable
		this.type = type;
		this.color = color;
		this.towerId = towerId;
		// !
		this.highlighted = false;
		this.neighbours = [];
	}

	get middle() {
		return new Vect2(this.x + this.tilesize / 2, this.y + this.tilesize / 2);
	}

	/**
	 * @param {String} TYPE
	 */
	set setType(TYPE) {
		this.type = TYPES[TYPE];
	}

	/**
	 * @param {Boolean} bool
	 */
	set highlight(bool) {
		this.highlighted = bool;
	}

	changeType(type) {
		if (TYPES[type] !== null) {
			this.type = TYPES[type];
			this.color = TYPE_COLORS[this.type];
		}
	}

	equals(otherNode) {
		if (this.x === otherNode.x && this.y === otherNode.y) return true;
		return false;
	}

	addDiagNeighbours(maxCols, maxRows, getNode) {
		if (this.row - 1 >= 0 && this.col - 1 >= 0) this.neighbours.push(getNode(this.col - 1, this.row - 1));
		if (this.row - 1 >= 0 && this.col + 1 < maxCols) this.neighbours.push(getNode(this.col + 1, this.row - 1));
		if (this.row + 1 < maxRows && this.col + 1 < maxCols) this.neighbours.push(getNode(this.col + 1, this.row + 1));
		if (this.row + 1 < maxRows && this.col - 1 >= 0) this.neighbours.push(getNode(this.col - 1, this.row + 1));
	}

	addNeighbours(maxCols, maxRows, getNode) {
		// sides
		if (this.col + 1 < maxCols) this.neighbours.push(getNode(this.col + 1, this.row));
		if (this.col - 1 >= 0) this.neighbours.push(getNode(this.col - 1, this.row));
		if (this.row + 1 < maxRows) this.neighbours.push(getNode(this.col, this.row + 1));
		if (this.row - 1 >= 0) this.neighbours.push(getNode(this.col, this.row - 1));
		// diag
		// this.addDiagNeighbours(maxCols, maxRows, getNode);
	}

	addTower(tower) {
		this.towerId = tower.id;
	}

	removeTower(towers, tower) {
		if (tower.id === this.towerId) {
			// this.towerIndex;
			this.tower = false;
			towers.remove(tower.id);
		}
	}

	draw(Draw) {
		Draw.setStroke("black");
		Draw.setFill("white");
		Draw.drawRect(this.x, this.y, this.tilesize, this.tilesize, true);
		Draw.drawRect(this.x, this.y, this.tilesize, this.tilesize);
	}
}
