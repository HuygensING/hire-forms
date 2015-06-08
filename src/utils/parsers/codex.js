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

let parseIncomingTextUnits = function(textUnits) {
	textUnits = textUnits.map((textUnit) => {
		textUnit.text = {
			key: textUnit.text.pid,
			value: textUnit.text.displayName
		};

		return textUnit;
	});

	return textUnits;
};

let parseIncomingMarginUnits = function(marginUnits) {
	marginUnits = marginUnits.map((marginUnit) => {
		marginUnit.annotators = marginUnit.annotators.map((annotator) => {
			annotator.person = {
				key: annotator.person.pid,
				value: annotator.person.name
			};

			annotator.certain = certainToBool(annotator.certain);

			return annotator;
		});

		marginUnit.origin.certain = certainToBool(marginUnit.origin.certain);

		return marginUnit;
	});

	return marginUnits;
};

let parseIncomingProvenances = function(provenances) {
	provenances = provenances.map((provenance) => {
		provenance.certain = certainToBool(provenance.certain);

		return provenance;
	});

	return provenances;
};

export let parseIncomingCodex = function(data) {
	data.textUnits = parseIncomingTextUnits(data.textUnits);
	data.marginUnits = parseIncomingMarginUnits(data.marginUnits);
	data.provenances = parseIncomingProvenances(data.provenances);

	data.origin.certain = certainToBool(data.origin.certain);

	return data;
};

export let parseOutgoingCodex = function(data) {
	let parser = function(key, value, obj) {
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

			obj["^locality"] = `${region}-${place}-${scriptorium}`;
			delete obj.locality;
		}
	};

	iterateObjectKeys(data, parser);

	return data;
};