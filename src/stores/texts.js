import Immutable from "immutable";
import EventEmitter from "events";

import dispatcher from "../dispatcher";

let model = new Immutable.Map({
	all: new Immutable.List(),
	current: new Immutable.Map()
});

let CHANGE_EVENT = "change";

class Texts extends EventEmitter {
	getState() {
		return model;
	}

	listen(callback) {
		this.addListener(CHANGE_EVENT, callback);
	}

	stopListening(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	onReceiveAll(data) {
		data = data.map((text) => ({
			key: text.id,
			value: text.label
		}));

		model = model.set("all", new Immutable.List(data));
	}
}

let texts = new Texts();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "TEXTS_RECEIVE_ALL":
			texts.onReceiveAll(payload.action.data);
			break;
		default:
			return;
	}

	texts.emit(CHANGE_EVENT);
};

texts.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default texts;