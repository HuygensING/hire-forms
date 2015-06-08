import dispatcher from "../dispatcher";
import API from "../utils/api";

let codexActions = {
	getCodex(id) {
		API.getCodex(id);
	},

	setKey(key, value) {
		dispatcher.handleViewAction({
			actionType: "CODEX_SET_KEY",
			key: key,
			value: value
		});
	},

	deleteKey(key) {
		dispatcher.handleViewAction({
			actionType: "CODEX_DELETE_KEY",
			key: key
		});
	},

	updateCodex() {
		API.updateCodex();
	}
};

export default codexActions;