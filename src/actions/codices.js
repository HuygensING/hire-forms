import xhr from "xhr";
import config from "../config";
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
		// if (checkForError(err, response, body)) {
		// 	return;
		// }
		let parsedJson = parseIncomingCodex(JSON.parse(body));

		cb(parsedJson);
	};

	xhr(options, done);
}

let setCodex = (id) => (dispatch, getState) => {
	let codices = getState().codices;

	if (codices.current != null && codices.current._id === id) {
		return;
	}

	// CODEX DOES NOT HAVE AN _ID!!!!!!!!!!!!!!!!!!!!!!
	let found = codices.all.filter((codex) =>
		codex._id === id);

	if (found.length) {
		dispatch({
			type: "SET_CURRENT_CODEX",
			current: found[0]
		});
	} else {
		dispatch({type: "REQUEST_CODEX"});

		fetch(`${config.codexUrl}/${id}/expandlinks`, (response) =>
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

		xhr({
			body: JSON.stringify(parseOutgoingCodex(codex)),
			headers: {...DEFAULT_HEADERS, ...{
				Authorization: localStorage.getItem("hi-marschol2-auth-token")
			}},
			method: "put",
			url: `${config.codexUrl}/${codex.pid}`
		}, (err, response, body) =>
			console.log(body)
		);

		// if (codex._id != null) {
		// 	let unchangedCodex = getState().codices.all
		// 		.filter((x) => x._id === codex._id);

		// 	if (!unchangedCodex.length) {
		// 		throw new Error(`Codex ${codex._id} not found in codices state.`);
		// 	}

		// 	let currentRelations = codex["@relations"];
		// 	let prevRelations = unchangedCodex[0]["@relations"];

		// 	saveRelations(
		// 		currentRelations,
		// 		prevRelations,
		// 		getState().relations.all,
		// 		codex._id,
		// 		getState().user.token
		// 	);
		// }

		// save(
		// 	config.codexUrl,
		// 	parseOutgoingCodex(codex),
		// 	getState().user.token,
		// 	(response) => {
		// 		dispatch({
		// 			type: "RECEIVE_CODEX",
		// 			response: response
		// 		});

		// 		dispatch(changeRoute("codex", [response._id]));
		// 		dispatch(toggleEdit(false));
		// 	}
		// );
	};
}

export {saveCodex, setCodex};

// export function deleteCodex() {
// 	return function (dispatch, getState) {
// 		let id = getState().codices.current._id;

// 		remove(
// 			`${config.codexUrl}/${id}`,
// 			getState().user.token,
// 			() => {
// 				dispatch({
// 					type: "CODEX_DELETED",
// 					id: id
// 				});

// 				dispatch(changeRoute("searchCodexs"));
// 				dispatch(toggleEdit(false));
// 			}
// 		);
// 	};
// }

// export function setCodexKey(key, value) {
// 	return {
// 		type: "SET_CODEX_KEY",
// 		key: key,
// 		value: value
// 	};
// }

// export function deleteCodexKey(key) {
// 	return {
// 		type: "DELETE_CODEX_KEY",
// 		key: key
// 	};
// }

// export function newCodex() {
// 	return {
// 		type: "NEW_CODEX"
// 	};
// }