import dispatcher from "../dispatcher";

let serverActions = {
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
	}
};

export default serverActions;