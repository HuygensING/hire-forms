import dispatcher from "../dispatcher";

let serverActions = {
	receiveUser(data) {
		dispatcher.handleServerAction({
			actionType: "USER_RECEIVE",
			data: data
		});
	},

	receiveCodex(data) {
		dispatcher.handleServerAction({
			actionType: "CODEX_RECEIVE",
			data: data
		});
	},

	receiveAllPersons(data) {
		dispatcher.handleServerAction({
			actionType: "PERSONS_RECEIVE_ALL",
			data: data
		});
	},

	receivePerson(data) {
		dispatcher.handleServerAction({
			actionType: "PERSONS_RECEIVE",
			data: data
		});
	},

	updatePerson(data) {
		dispatcher.handleServerAction({
			actionType: "PERSONS_UPDATE",
			data: data
		});
	},

	receiveAllTexts(data) {
		dispatcher.handleServerAction({
			actionType: "TEXTS_RECEIVE_ALL",
			data: data
		});
	},

	receiveText(data) {
		dispatcher.handleServerAction({
			actionType: "TEXTS_RECEIVE",
			data: data
		});
	},

	updateText(data) {
		dispatcher.handleServerAction({
			actionType: "TEXTS_UPDATE",
			data: data
		});
	}
};

export default serverActions;