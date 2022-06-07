import { Rectangle } from "./collision/collision.js";
import Draw from "./render/Drawer.js";
import Mouse from "./input/Mouse.js";
import Input from "./input/Input.js";
import Grid from "./map/Grid.js";
import UI from "./ui/UI.js";
import Player from "./gameObjects/player/Player.js";
import SaveLoadSystem from "./SaveAndLoad.js";

export const bind = (fn, thisBind) => {
	return fn.bind(thisBind);
};

export class Serializeable {
	constructor(obj, action, load) {
		this.obj = obj;
		this.action = action;
		this.load = load;
	}
	serialize() {
		return this.obj.serialized();
	}
}

export default class Game {
	constructor(startAnimation, canvas, width, height, cols, rows, tilesize) {
		this.paused = false;
		this.started = false;
		this.lastRan = 0;
		this.startAnimation = startAnimation;
		this.canvas = canvas;
		this.input = new Input();
		this.Draw = new Draw(canvas.getContext("2d"));
		this.map = new Grid(width, height, cols, rows, tilesize);
		this.mouse = new Mouse(
			canvas,
			new Rectangle(0, 0, width, height),
			this.map.getTileXY.bind(this.map),
			this.interact.bind(this)
		);
		this.ui = new UI(this.mouse.setAction.bind(this.mouse), bind(this.start, this));
		this.player = new Player(width / 2, height / 2, tilesize, tilesize);
		const serializeables = [
			new Serializeable(this.player, "Player", bind(this.player.load, this.player)),
			new Serializeable(this.map, "Map", bind(this.map.generateSavedMap, this.map)),
		];
		this.SaveLoadSystem = new SaveLoadSystem(serializeables);
	}

	start() {
		this.started = true;
		this.player.getKey = bind(this.input.getKey, this.input);

		// console.log("hi!", this.startAnimation);
		this.startAnimation();
	}

	interact() {
		const actionToExecute = this.mouse.action;
		if (!actionToExecute || !this.started) return;
		console.log("Interacting...");
		const selectedTile = this.mouse.selected;
		selectedTile.changeType(actionToExecute);
	}

	renderTiles() {
		for (const tile of this.map.grid) {
			if (tile.highlighted) {
				this.Draw.fill = "rgba(0,0,0,0.6)";
				this.Draw.rect(tile.x, tile.y, tile.tilesize, tile.tilesize, true);
			}
			this.Draw.fill = tile.color;
			this.Draw.rect(tile.x, tile.y, tile.tilesize, tile.tilesize, true);
			this.Draw.rect(tile.x, tile.y, tile.tilesize, tile.tilesize);
		}
	}

	render() {
		this.Draw.clear(0, 0, this.map.width, this.map.height);
		this.renderTiles();
		this.player.render(this.Draw);
	}

	update() {
		this.player.update(this.input);
	}
}
