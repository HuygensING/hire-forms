import xhr from "xhr";

import serverActions from "../actions/server";

var baseUrl = "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend";

var handleError = function(err) {
	console.error("Some xhr request failed!", err);
};

export default {
	getAllPersons() {
		let options = {
			url: `${baseUrl}/lists/person`,
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

	getPerson(url) {
		let options = {
			url: url,
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
		let url = personData.key;

		delete personData.key;
		delete personData.value;

		let options = {
			method: "PUT",
			body: JSON.stringify(personData),
			url: url,
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Federated 87ebe90a-d980-44c7-80eb-45e1d3edc0fd"
			}
		};

		serverActions.updatePerson(personData);

		let done = function(err){
			if (err) {
				handleError(err);
			}
		};

		xhr(options, done);
	},

	getAllTexts() {
		let options = {
			url: `${baseUrl}/lists/text`,
			header: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveAllTexts(JSON.parse(body));
		};

		xhr(options, done);
	},

	getText(url) {
		let options = {
			url: url,
			header: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveText(JSON.parse(body));
		};

		xhr(options, done);
	}
};