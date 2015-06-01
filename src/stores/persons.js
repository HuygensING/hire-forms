import Immutable from "immutable";
import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

let model = new Immutable.Map({
	all: new Immutable.List(),
	current: new Immutable.Map()
});

const CHANGE_EVENT = "change";

class Persons extends EventEmitter{
	getState() {
		return model;
	}

	listen(callback) {
		this.addListener(CHANGE_EVENT, callback);
	}

	stopListening(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	_set(key, value) {
		if (!Array.isArray(key)) {
			key = [key];
		}

		model = model.setIn(key, value);
	}

	_delete(key) {
		model = model.deleteIn(key);
	}

	onReceiveAll(data) {
		data = data.map((person) => ({
			key: person.id,
			value: person.label
		}));

		model = model.set("all", Immutable.fromJS(data));
	}

	onReceive(data) {
		let index = model.get("all").findIndex((entry) =>
			entry.get("key") === `/persons/${data.pid}`
		);

		model = model.mergeIn(["all", index], data);

		model = model.set("current", model.getIn(["all", index]));
	}

	onUpdate(data) {
		data.value = data.name;
		console.log(data);
		this.onReceive(data);
	}
}

let persons = new Persons();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "PERSONS_RECEIVE_ALL":
			persons.onReceiveAll(payload.action.data);
			break;
		case "PERSONS_RECEIVE":
			persons.onReceive(payload.action.data);
			break;
		case "PERSONS_UPDATE":
			persons.onUpdate(payload.action.data);
			break;
		default:
			return;
	}

	persons.emit(CHANGE_EVENT);
};

persons.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default persons;