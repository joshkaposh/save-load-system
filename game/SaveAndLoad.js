import { serialize, serializeArray, deserializeArray, deserialize } from "./serialize/serialize.js";

const METHODS = {
	post: "POST",
	get: "GET",
};

const URL = "http://localhost:3000/";

const getFromServer = async (action) => {
	const url = `${URL}${action}`;
	console.log(url);
	return await fetch(url, {
		method: METHODS.get,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": url,
		},
	});
};

const postToServer = async (action, data) => {
	if (!action || data) {
		console.log("Couldnt perform post on %s action on %O data", action, data);
		return;
	}
	const url = `${URL}${action}`;
	console.log(url);

	return await fetch(url, {
		method: METHODS.post,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": url,
		},

		body: data,
	});
};

const saveToServer = async (action, data) => {
	// 'Content-Type': "application/x-www-form-urlencoded",
	if (!action || !data) return null;
	return await postToServer(action, data);
};

const loadFromServer = async (action) => {
	const response = await getFromServer(action);
	const body = await response.text();

	if (JSON.parse(body).length > 1) {
		return deserializeArray(JSON.parse(body));
	} else {
		return deserialize(body)[0];
	}
};

export default class SaveLoadSystem {
	// #resetGame;
	constructor(objsToSerialize) {
		// objToSerialize
		//! WILL BREAK IF OBJ DOESNT IMPLEMENT SERIALIZED METHOD
		//* [{obj,action,load}]
		document
			.getElementById("save")
			.addEventListener("submit", async (e) => await this.saveMultiple(e, objsToSerialize));

		document
			.getElementById("load")
			.addEventListener("submit", async (e) => await this.loadMultiple(e, objsToSerialize));
	}

	async saveMultiple(e, objs) {
		e.preventDefault();
		if (!objs) {
			return;
		}
		for (let i = 0; i < objs.length; i++) {
			await this.save(objs[i]);
		}
	}

	async save(objToSave) {
		const { obj, action } = objToSave;
		const serialized = obj.serialized();
		await saveToServer(`save${action}`, serialized);
	}

	async loadMultiple(e, objs) {
		e.preventDefault();
		if (!objs) return;
		for (let i = 0; i < objs.length; i++) {
			await this.load(objs[i]);
		}
	}

	async load(objToLoad) {
		const { action, load } = objToLoad;
		const loaded = await loadFromServer(`load${action}`);
		load(loaded);
	}
}
