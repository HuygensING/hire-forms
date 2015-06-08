// TODO Remove uncamel cased vars
import Immutable from "immutable";

import BaseStore from "./base";
import dispatcher from "../dispatcher";

let userModel = new Immutable.Map({
	id: "",
	firstName: "",
	lastName: "",
	groups: new Immutable.List()
});

const CHANGE_EVENT = "change";

class UserStore extends BaseStore {
	constructor() {
		super();

		this.model = userModel;
	}

	getState() {
		return {
			user: this.model
		};
	}

	receive(data) {
		this.model = Immutable.fromJS(data);
	}
}

let user = new UserStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "USER_RECEIVE":
			user.receive(payload.action.data);
			break;
		default:
			return;
	}

	user.emit(CHANGE_EVENT);
};

user.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default user;