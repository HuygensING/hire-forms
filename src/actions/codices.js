import {browserHistory} from "react-router";
import xhr from "xhr";
import {codexUrl} from "../config";
import {parseIncomingCodex, parseOutgoingCodex} from "../utils/parsers/codex";
// import {fetch, save, remove, saveRelations} from "./utils";
// import {changeRoute, toggleEdit} from "./router";

const DEFAULT_HEADERS = {
	"Accept": "application/json",
	"Content-Type": "application/json"
};

function fetch(url, cb) {
	let options = {
		headers: DEFAULT_HEADERS,
		url: url
	};

	let done = function(err, response, body) {
		if (response.statusCode === 404) {
			browserHistory.push("/404");
		}

		let parsedJson = parseIncomingCodex(JSON.parse(body));

		cb(parsedJson);
	};

	xhr(options, done);
}

let setCodex = (id) => (dispatch, getState) => {
	let codices = getState().codices;

	if (codices.current != null && codices.current.pid === id) {
		return;
	}

	let found = codices.all.filter((codex) => codex.pid === id);

	if (found.length) {
		dispatch({
			type: "SET_CURRENT_CODEX",
			current: found[0]
		});
	} else {
		dispatch({type: "REQUEST_CODEX"});

		fetch(`${codexUrl}/${id}/expandlinks`, (response) =>
			dispatch({
				type: "RECEIVE_CODEX",
				response: response
			})
		);
	}
}

export function saveCodex() {
	return function (dispatch, getState) {
		let codex = getState().codices.current;

		let method = codex.pid === "" ?
			"post" :
			"put";

		dispatch({type: "SAVE_CODEX"});

		xhr({
			body: JSON.stringify(parseOutgoingCodex(codex)),
			headers: {...DEFAULT_HEADERS, ...{
				Authorization: localStorage.getItem("hi-marschol2-auth-token")
			}},
			method: method,
			url: `${codexUrl}/${codex.pid}`
		}, (err, response, body) => {
			if (err) {
				console.error(err);
			}

			let id = codex.pid;

			if (response.headers.hasOwnProperty("location")) {
				let lastIndex = response.headers.location.lastIndexOf("/");
				id = response.headers.location.substr(lastIndex + 1);
			}

			dispatch({type: "SAVED_CODEX"});
			dispatch(setCodex(id));
		});
	}
}

export function removeCodex() {
	return function (dispatch, getState) {
		let codex = getState().codices.current;

		xhr({
			headers: {...DEFAULT_HEADERS, ...{
				Authorization: getState().user.token
			}},
			method: "delete",
			url: `${codexUrl}/${codex.pid}`
		}, (err, response, body) => {
			browserHistory.push("/")
			dispatch({
				type: "REMOVE_CODEX",
				id: codex.pid
			})
		});
	}
}

export {saveCodex, setCodex, removeCodex};
