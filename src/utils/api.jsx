import xhr from "xhr";

import serverActions from "../actions/server";

var baseUrl = "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend";

var handleError = function(err) {
	console.error("Some xhr request failed!", err);
};

export default {
	getAllPersons() {
		let options = {
			url: `$(baseUrl)/lists/person`,
			header: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveAllPersons(JSON.parse(body));
		};

		xhr(options, done);
	},

	getPerson(id) {
		let options = {
			url: baseUrl + id,
			header: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receivePerson(JSON.parse(body));
		};

		xhr(options, done);
	},

	updatePerson(data) {
		let personData = data.toJS();

		let id = personData.key;
		delete personData.key;
		delete personData.value;

		let options = {
			method: "PUT",
			body: JSON.stringify(personData),
			url: baseUrl + id,
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Federated 5fc90b8a-71dd-457e-9a7e-6305773b7bbc"
			}
		};

		let done = function(err, resp, body){
			if (err) { handleError(err); }

			serverActions.updatePerson(body);
		};

		xhr(options, done);
	},

	getAllTexts() {
		let options = {
			url: `$(baseUrl)/lists/text`,
			header: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveAllTexts(JSON.parse(body));
		};

		xhr(options, done);
	}
};