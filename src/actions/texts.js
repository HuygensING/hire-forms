import API from "../utils/api";

let textsActions = {
	getAllTexts() {
		API.getAllTexts();
	},

	getText(id) {
		API.getText(id);
	},

	updateText(data) {
		API.updateText(data);
	}
};

export default textsActions;