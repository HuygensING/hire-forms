import Immutable from "immutable";
import BaseStore from "./base";

import dispatcher from "../dispatcher";

const CHANGE_EVENT = "change";

/**
 * Parse a text received from the server.
 *
 * @params {Object} data - Text data received from the server.
 * @returns {Object} Parsed data
 */
let parseText = function(data) {
	data.authors = data.authors.map((author) => {
		return {
			key: author.person.pid,
			value: author.person.name
		};
	});

	return data;
};

class Texts extends BaseStore {
	constructor() {
		super();

		this.allTexts = new Immutable.List();
		this.text = new Immutable.Map({
			title: "",
			authors: new Immutable.List(),
			period: "",
			contentTypes: new Immutable.List()
		});
	}

	getState() {
		return {
			text: this.text,
			allTexts: this.allTexts
		};
	}

	onReceiveAll(data) {
		data = data.map((text) => ({
			key: text.id,
			value: text.label
		}));

		this.allTexts = Immutable.fromJS(data);
	}

	onReceive(data) {
		let index = this.allTexts.findIndex((person) => {
			let key = person.get("key");
			let personId = key.substr(key.lastIndexOf("/") + 1 );
			return (personId === data.pid);
		});

		this.allTexts = this.allTexts.mergeIn([index], data);
		this.text = this.allTexts.get(index);
	}
}

let texts = new Texts();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		// Receive all texts from the server.
		case "TEXTS_RECEIVE_ALL":
			texts.onReceiveAll(payload.action.data);
			break;

		// Receive a text from the server.
		case "TEXTS_RECEIVE":
			let data = parseText(payload.action.data);
			texts.onReceive(data);
			break;

		// Update a text with user altered data.
		case "TEXTS_UPDATE":
			let data = payload.action.data;

			let authors = data.authors.map((author) =>
				author.value
			);

			authors = authors.length ?
				authors.join(" & ") :
				"(unkown author)";

			data.value = data.title + " - " + authors;
			texts.onReceive(data);
			break;

		default:
			return;
	}

	texts.emit(CHANGE_EVENT);
};

texts.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default texts;