import Game from "./game/Game.js";
const canvas = document.getElementById("canvas");
// const startBtn = document.getElementById()
let game;
const width = 500;
const height = width;
const cols = 10;
const rows = cols;
const tilesize = Math.floor(width / cols);
const startBtn = document.getElementById("start");
const saveBtn = document.getElementById("save");
const loadBtn = document.getElementById("load");

let anId;

function animate() {
	if (!game.started) {
		anId = cancelAnimationFrame(animate);
		game.lastRan = anId;
		return;
	}
	game.update();
	game.render();

	anId = requestAnimationFrame(animate);
}

function startGame() {
	showUI([saveBtn, loadBtn]);
	hideUI([startBtn]);
	animate();
}

function showUI(els) {
	for (let i = 0; i < els.length; i++) {
		els[i].classList.remove("invisible");
		els[i].classList.add("visible");
	}
}

function hideUI(els) {
	for (let i = 0; i < els.length; i++) {
		els[i].classList.remove("visible");
		els[i].classList.add("invisible");
	}
}

function init() {
	canvas.width = width;
	canvas.height = height;

	hideUI([saveBtn, loadBtn]);

	game = new Game(startGame, canvas, width, height, cols, rows, tilesize);
	// animate();
}

init();
