import Immutable from "immutable";
import BaseStore from "./base";

import dispatcher from "../dispatcher";

const CHANGE_EVENT = "change";

class Texts extends BaseStore {
	constructor() {
		super();

		this.model = new Immutable.Map({
			all: new Immutable.List(),
			current: new Immutable.Map()
		});
	}

	onReceiveAll(data) {
		data = data.map((text) => ({
			key: text.id,
			value: text.label
		}));

		this.model = this.model.set("all", Immutable.fromJS(data));
	}

	onReceive(data) {
		let index = this.model.get("all").findIndex((person) => {
			let key = person.get("key");
			let personId = key.substr(key.lastIndexOf("/") + 1 );
			return (personId === data.pid);
		});

		this.model = this.model.mergeIn(["all", index], data);

		this.model = this.model.set("current", this.model.getIn(["all", index]));
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
			texts.onReceive(payload.action.data);
			break;

		// Update a text with user altered data.
		case "TEXTS_UPDATE":
			let data = payload.action.data;
			data.value = data.name;
			texts.onReceive(data);
			break;

		default:
			return;
	}

	texts.emit(CHANGE_EVENT);
};

texts.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default texts;