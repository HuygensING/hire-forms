import R from "ramda";
import {textUrl} from "../config";

let initialState = [];

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_TEXTS":
			state = action.texts.map((text) => {
				text.key = text.id;
				text.value = text.label;

				delete text.id;
				delete text.label;

				return text;
			});

			break;

		case "UPDATE_TEXT":
			// Filter and reject function, match the text.pid to
			// the id (http://.../texts/{pid}) in state;
			let idEq = (text) =>
				text.key.split("/").slice(-1)[0] === action.text.pid

			// Filter out the updated texts from the state.
			let updatedTexts = R.filter(idEq, state);

			// Get the index of the first editted entry.
			let index = R.indexOf(R.head(updatedTexts), state);

			// Remove the updated entries from the state.
			let nextState = R.reject(idEq, state);

			// Rebuild (to add/remove) the updated texts.
			let nextTexts = R.map((author) => {
				return {
					key: `${textUrl}/${action.text.pid}`,
					value: `${action.text.title} - ${author.value}`
				}
			}, action.text.authors);

			// Insert the new texts into the next state.
			state = R.insertAll(index, nextTexts, nextState);

			break;
	}

	return state;
}

