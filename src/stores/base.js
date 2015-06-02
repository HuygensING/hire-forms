import {EventEmitter} from "events";

const CHANGE_EVENT = "change";

class BaseStore extends EventEmitter {
	getState() {
		return this.model;
	}

	listen(callback) {
		this.addListener(CHANGE_EVENT, callback);
	}

	stopListening(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

export default BaseStore;