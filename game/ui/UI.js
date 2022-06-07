import { TILES, TYPES, TYPE_COLORS } from "../map/GridNode.js";

// const saveToServer = async (url, data) => {
// 	// "Content-Type": "application/x-www-form-urlencoded",

// 	return await fetch(url, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},

// 		body: JSON.stringify(data),
// 	});
// };

// const loadFromServer = async (url) => {
// 	console.log(url);
// 	return await fetch(url, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	// then((res) => {
// 	// 	const reader = res.body.getReader();
// 	// 	reader.read().then(({ done, value }) => {
// 	// 		console.log(done, value);
// 	// 		if (done) {
// 	// 		}
// 	// 	});
// 	// });
// };

// const replacer = (key, value) => {
// 	if (key === "neighbours") return undefined;
// 	else return value;
// };

// const serializeMap = (map) => {
// 	const data = [];

// 	for (const [i, node] of map.entries()) {
// 		const serialized = JSON.stringify(node, replacer);
// 		data.push({ i, serialized });
// 	}
// 	return data;
// };

// const deserializeMap = (data) => {
// 	const arr = [];
// 	for (let nodeIndex = 0; nodeIndex < data.length; nodeIndex++) {
// 		const parsed = JSON.parse(data[nodeIndex].serialized);
// 		arr.push(parsed);
// 	}
// 	return arr;
// };

// class SaveLoadSystem {
// 	#saveUrl;
// 	#loadUrl;
// 	#resetGame;
// 	constructor(map, resetGame) {
// 		this.#resetGame = resetGame;

// 		this.saveMap = document.getElementById("saveMap");
// 		this.saveStatus = document.getElementById("saveStatus");
// 		this.#saveUrl = this.saveMap.dataset.saveUrl;

// 		this.loadMap = document.getElementById("loadMap");
// 		this.loadStatus = document.getElementById("loadStatus");
// 		this.#loadUrl = this.loadMap.dataset.loadUrl;

// 		this.saveMap.addEventListener("submit", async (e) => {
// 			e.preventDefault();
// 			const saver = this.saveStatus;
// 			saver.textContent = "Saving...";
// 			let data = serializeMap(map);
// 			const result = await saveToServer(this.#saveUrl, data);
// 			saver.textContent = result ? "Saved" : "Failed Saving";
// 		});
// 		// load map on click

// 		this.loadMap.addEventListener("submit", async (e) => {
// 			e.preventDefault();
// 			const loader = this.loadStatus;
// 			loader.textContent = "Loading...";

// 			const response = await loadFromServer(this.#loadUrl);
// 			const body = await response.text();

// 			loader.textContent = response ? "Loaded" : "Failed Loading";
// 			console.log("Response:", response);
// 			// console.log(response.body);
// 			// console.log(body);
// 			// console.log(JSON.parse(body));
// 			const loadedMap = deserializeMap(JSON.parse(body));
// 			console.log(loadedMap);

// 			this.#resetGame(loadedMap);
// 		});
// 	}
// }

export default class UI {
	constructor(selectTileType, startGame) {
		this.ui = document.getElementById("ui");
		document.getElementById("start").addEventListener("submit", (e) => {
			e.preventDefault();
			startGame();
		});

		this.current = null;

		for (const [key, value] of Object.entries(TYPES)) {
			console.log(key, value);
			const btn = document.getElementById(key);
			btn.addEventListener("click", selectTileType);
		}
	}
}
