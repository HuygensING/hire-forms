import clone from "lodash.clonedeep";

let certainToBool = function(certain) {
	return (certain === "certain") ?
		true :
		false;
};

let boolToCertain = function(bool) {
	return (bool) ?
		"certain" :
		"uncertain";
};

let isObject = function(obj) {
	return obj !== null && !Array.isArray(obj) && typeof obj === "object";
};

let iterateObjectKeys = function(obj, parser) {
	Object.keys(obj).forEach((key) => {
		let value = obj[key];

		if (Array.isArray(value)) {
			if (value.length && isObject(value[0])) {
				value.forEach((nestedObject) =>
					iterateObjectKeys(nestedObject, parser)
				);
			}
		} else if (isObject(value)) {
			iterateObjectKeys(value, parser);
		}

		parser(key, value, obj);
	});
};

let slugify = function(value) {
	value = value.toLowerCase();
	value = value.replace(" ", "");
	value = value.replace("(", "");
	value = value.replace(")", "");
	value = value.replace(".", "");
	value = value.replace("-", "");

	return value;
};

const blocksAndColumnsToString = (arr) => {
	while (arr.length < 3) {
		arr.push(0);
	}

	arr = arr.map((size, index) =>
		(index % 2 === 0) ?
			size :
			`<${size}>`
	)

	return arr.join("");
}

const blocksAndColumnsToArray = (str) => {
	// console.log("HERE", str)
	return str
		.split(/<|>/g)
		.map((num) => +num);
}

let inComingParser = function(key, value, obj) {
	if (key === "certain") {
		obj.certain = certainToBool(obj.certain);
	}

	if (key === "person") {
		obj.person = {
			key: value.pid,
			value: value.name
		};
	}

	if (key === "text") {
		obj.text = {...value, ...{
			key: value.pid,
			value: value.displayName
		}};
	}

	if (key === "blockHeights") {
		obj.blockHeights = blocksAndColumnsToString(obj.blockHeights);
	}

	if (key === "columnWidths") {
		obj.columnWidths = blocksAndColumnsToString(obj.columnWidths);
	}
};

let outGoingParser = function(key, value, obj) {
	if (key === "certain") {
		obj.certain = boolToCertain(obj.certain);
	}

	if (key === "person") {
		obj["^person"] = `/persons/${obj.person.key}`;
		delete obj.person;
	}

	if (key === "text") {
		obj["^text"] = `/texts/${obj.text.key}`;
		delete obj.text;
	}

	if (key === "user") {
		obj["^user"] = `/users/${obj.user.id}`;
		delete obj.user;
	}

	if (key === "locality") {
		let [region, place, scriptorium] = [
			obj.locality.region,
			obj.locality.place,
			obj.locality.scriptorium
		].map(slugify);


		if (region !== "" || place !== "" || scriptorium !== "") {
			obj["^locality"] = `${region}-${place}-${scriptorium}`;
		}

		delete obj.locality;
	}

	if (key === "blockHeights") {
		obj.blockHeights = blocksAndColumnsToArray(obj.blockHeights);
	}

	if (key === "columnWidths") {
		obj.columnWidths = blocksAndColumnsToArray(obj.columnWidths);
	}

	if (value == null) {
		delete obj[key];
	}
};

export let parseIncomingCodex = function(data) {
	const dataClone = clone(data);
	iterateObjectKeys(dataClone, inComingParser);

	return dataClone;
};

export let parseOutgoingCodex = function(data) {
	const dataClone = clone(data);
	iterateObjectKeys(dataClone, outGoingParser);

	return dataClone;
};
