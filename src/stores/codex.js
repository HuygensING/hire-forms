// TODO Remove uncamel cased vars
import Immutable from "immutable";

import BaseStore from "./base";
import dispatcher from "../dispatcher";

import codexModel from "./models/codex";

import alwaysArray from "../utils/always-array";

const CHANGE_EVENT = "change";

class CodexStore extends BaseStore {
	constructor() {
		super();

		this.model = codexModel;
	}

	getState() {
		return {
			codex: this.model
		};
	}

	setKey(key, value) {
		key = alwaysArray(key);

		// Turn an array into an Immutable.List
		if (Array.isArray(value)) {
			value = new Immutable.List(value);
		}

		// Turn a key-value object into an Immutable.Map
		if (value.hasOwnProperty("key")) {
			value = new Immutable.Map(value);
		}

		this.model = this.model.setIn(key, value);
	}

	deleteKey(key) {
		this.model = this.model.deleteIn(key);
	}

	receive(data) {
		this.model = Immutable.fromJS(data);
	}
}

let codex = new CodexStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "CODEX_RECEIVE":
			codex.receive(payload.action.data);
			break;
		case "CODEX_SET_KEY":
			codex.setKey(payload.action.key, payload.action.value);
			break;
		case "CODEX_DELETE_KEY":
			codex.deleteKey(payload.action.key);
			break;
		default:
			return;
	}

	codex.emit(CHANGE_EVENT);
};

codex.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default codex;