import clone from 'lodash.clonedeep';

const certainToBool = (certain) => certain === 'certain';

const boolToCertain = (bool) =>
	(bool) ?
		'certain' :
		'uncertain';

const isObject = (obj) =>
	obj !== null && !Array.isArray(obj) && typeof obj === 'object';

const iterateObjectKeys = (obj, parser) =>
	Object.keys(obj).forEach((key) => {
		const value = obj[key];

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

const slugify = (value) => {
	let nextValue = value;
	nextValue = nextValue.toLowerCase();
	nextValue = nextValue.replace(' ', '');
	nextValue = nextValue.replace('(', '');
	nextValue = nextValue.replace(')', '');
	nextValue = nextValue.replace('.', '');
	nextValue = nextValue.replace('-', '');
	return nextValue;
};

const inComingParser = (key, value, obj) => {
	if (key === 'certain') {
		obj.certain = certainToBool(obj.certain);
	}

	if (key === 'person') {
		obj.person = {
			key: value.pid,
			value: value.name
		};
	}

	if (key === 'text') {
		obj.text = { ...value, ...{
			key: value.pid,
			value: value.displayName,
		} };
	}
};

const outGoingParser = (key, value, obj) => {
	if (key === 'certain') {
		obj.certain = boolToCertain(obj.certain);
	}

	if (key === 'person') {
		obj['^person'] = `/persons/${obj.person.key}`;
		delete obj.person;
	}

	if (key === 'text') {
		if (obj.text.key !== '') {
			obj['^text'] = `/texts/${obj.text.key}`;
		}

		delete obj.text;
	}

	if (key === 'user') {
		obj['^user'] = `/users/${obj.user.id}`;
		delete obj.user;
	}

	if (key === 'locality') {
		let [region, place, scriptorium] = [
			obj.locality.region,
			obj.locality.place,
			obj.locality.scriptorium
		].map(slugify);


		if (region !== '' || place !== '' || scriptorium !== '') {
			obj['^locality'] = `${region}-${place}-${scriptorium}`;
		}

		delete obj.locality;
	}

	if (value == null) {
		delete obj[key];
	}
};

export const parseIncomingCodex = (data) => {
	const dataClone = clone(data);
	iterateObjectKeys(dataClone, inComingParser);

	return dataClone;
};

export const parseOutgoingCodex = (data) => {
	const dataClone = clone(data);
	iterateObjectKeys(dataClone, outGoingParser);

	if (!dataClone.origin.hasOwnProperty('^locality')) {
		delete dataClone.origin;
	}

	if (dataClone.hasOwnProperty('errors')) delete dataClone.errors;

	return dataClone;
};
