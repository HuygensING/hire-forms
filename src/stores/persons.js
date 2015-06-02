import Immutable from "immutable";
import BaseStore from "./base";

import dispatcher from "../dispatcher";

const CHANGE_EVENT = "change";

class Persons extends BaseStore {
	constructor() {
		super();

		this.model = new Immutable.Map({
			all: new Immutable.List(),
			current: new Immutable.Map()
		});
	}

	onReceiveAll(data) {
		data = data.map((person) => ({
			key: person.id,
			value: person.label
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

let persons = new Persons();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		// Receive all persons from the server.
		case "PERSONS_RECEIVE_ALL":
			persons.onReceiveAll(payload.action.data);
			break;

		// Receive a person from the server.
		case "PERSONS_RECEIVE":
			persons.onReceive(payload.action.data);
			break;

		// Update a person with user altered data.
		case "PERSONS_UPDATE":
			let data = payload.action.data;
			data.value = data.name;
			persons.onReceive(data);
			break;

		default:
			return;
	}

	persons.emit(CHANGE_EVENT);
};

persons.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default persons;