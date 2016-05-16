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
		if (obj.text.key !== '') {
			obj["^text"] = `/texts/${obj.text.key}`;
		}

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

	if (!dataClone.origin.hasOwnProperty('^locality')) {
		delete dataClone.origin;
	}

	if (dataClone.hasOwnProperty('errors')) delete dataClone.errors;

	return dataClone;
};
