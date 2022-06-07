export const serialize = (serializeable, replacer) => {
	return JSON.stringify(serializeable, replacer);
};

// export const serializeFields = (serializeableFields,replacer) => {
// 	const serialized = {};
// 	// for (const {key,value} of object) {

// 	// }
// }

export const deserialize = (serialized) => {
	// console.log(serialized);
	return JSON.parse(serialized);
};

export const deserializeArray = (data) => {
	const arr = [];
	// console.log("HIIIIIIII");
	// console.log(data.length, data);
	for (let i = 0; i < data.length; i++) {
		// console.log(data[i].serialized);
		arr.push(deserialize(data[i].serialized));
	}
	return arr;
};

export const serializeArray = (array, replacer) => {
	const data = [];
	console.log("HIIIIIIII");
	console.log(array, replacer);

	for (const [i, el] of array.entries()) {
		data.push({ i, serialized: serialize(el, replacer) });
	}

	return JSON.stringify(data);
};
