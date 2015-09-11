import API from "../utils/api";

let personsActions = {
	getAllPersons() {
		API.getAllPersons();
	},

	getPerson(id) {
		API.getPerson(id);
	},

	updatePerson(data) {
		API.updatePerson(data);
	}
};

export default personsActions;