import xhr from "xhr";

import serverActions from "../actions/server";
import codexStore from "../stores/codex";

import {parseIncomingCodex, parseOutgoingCodex} from "./parsers/codex";

let baseUrl = "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend";

let handleError = function(err) {
	console.error("Some xhr request failed!", err);
};

export default {
	getCurrentUser() {
		let options = {
			url: `${baseUrl}/current_session/user`,
			headers: {
				Authorization: localStorage.getItem("hi-marschol2-auth-token"),
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			if (resp.statusCode === 401) {
				console.error("NOT LOGGED IN!");
			} else {
				serverActions.receiveUser(JSON.parse(body));
			}
		};

		xhr(options, done);
	},

	getCodex(id) {
		let options = {
			url: `${baseUrl}/codex/${id}/expandlinks`,
			headers: {
				"Content-Type": "application/json"
			}
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			body = JSON.parse(body);
			let parsedData = parseIncomingCodex(body);

			serverActions.receiveCodex(parsedData);
		};

		xhr(options, done);
	},

	updateCodex() {
		let model = codexStore.getState().codex;
		let data = parseOutgoingCodex(model.toJS());

		let options = {
			body: JSON.stringify(data),
			headers: {
				Authorization: localStorage.getItem("hi-marschol2-auth-token"),
				"Content-Type": "application/json"
			},
			method: "PUT",
			url: `${baseUrl}/codex/${model.get("pid")}`
		};

		let done = function(err) {
			if (err) { handleError(err); }
		};

		xhr(options, done);
	},

	getAllPersons() {
		let options = {
			headers: {
				"Content-Type": "application/json"
			},
			url: `${baseUrl}/lists/person`
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveAllPersons(JSON.parse(body));
		};

		xhr(options, done);
	},

	getPerson(url) {
		let options = {
			headers: {
				"Content-Type": "application/json"
			},
			url: url
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
			body: JSON.stringify(personData),
			headers: {
				Authorization: localStorage.getItem("hi-marschol2-auth-token"),
				"Content-Type": "application/json"
			},
			method: "PUT",
			url: url
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
			headers: {
				"Content-Type": "application/json"
			},
			url: `${baseUrl}/lists/text`
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveAllTexts(JSON.parse(body));
		};

		xhr(options, done);
	},

	getText(url) {
		let options = {
			headers: {
				"Content-Type": "application/json"
			},
			url: url + "/expandlinks"
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err); }

			serverActions.receiveText(JSON.parse(body));
		};

		xhr(options, done);
	},

	updateText(data) {
		let textData = Object.assign({}, data);
		let url = textData.key;

		delete textData.key;
		delete textData.value;

		textData.authors = textData.authors.map((author) => {
			let key = (author.key.substr(0, 7) === "http://") ?
				author.key.substr(author.key.lastIndexOf("/") + 1) :
				author.key;

			return {
				"^person": "/persons/" + key
			};
		});

		let options = {
			body: JSON.stringify(textData),
			headers: {
				Authorization: localStorage.getItem("hi-marschol2-auth-token"),
				"Content-Type": "application/json"
			},
			method: "PUT",
			url: url
		};

		serverActions.updateText(data);

		let done = function(err){
			if (err) {
				handleError(err);
			}
		};

		xhr(options, done);
	}
};