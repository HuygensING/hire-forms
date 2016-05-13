import { textUrl } from 'src/config';

const initialState = [];

export default function (state = initialState, action) {
	let nextState;

	switch (action.type) {
		// case "RECEIVE_TEXTS":
		// 	state = action.texts.map((text) => {
		// 		text.key = text.id;
		// 		text.value = text.label;
		//
		// 		delete text.id;
		// 		delete text.label;
		//
		// 		return text;
		// 	});
		//
		// 	break;
		case 'RECEIVE_TEXTS':
			nextState = action.texts.map((text) => ({
				key: text.id,
				value: text.label,
			}));

			break;

		case 'UPDATE_TEXT': {
			const key = `${textUrl}/${action.text.pid}`;
			const index = state.findIndex((text) =>
				text.key.split('/').slice(-1)[0] === action.text.pid
			);

			const updatedTexts = action.text.authors
				.map((author) => ({
					key,
					value: `${action.text.title} - ${author.value}`,
				}));

			nextState = state.filter((text) => text.key !== key);

			if (index !== -1) {
				nextState.splice(index, updatedTexts.length, ...updatedTexts);
			} else {
				nextState = nextState.concat(updatedTexts);
			}

			nextState.sort((a, b) => a.value.localeCompare(b.value));

			break;
		}
		//
		// case "UPDATE_TEXT":
		// 	// Filter and reject function, match the text.pid to
		// 	// the id (http://.../texts/{pid}) in state;
		// 	let idEq = (text) =>
		// 		text.key.split("/").slice(-1)[0] === action.text.pid
		//
		// 	// Filter out the updated texts from the state.
		// 	let updatedTexts = R.filter(idEq, state);
		//
		// 	// Get the index of the first editted entry.
		// 	let index = R.indexOf(R.head(updatedTexts), state);
		//
		// 	// Remove the updated entries from the state.
		// 	nextState = R.reject(idEq, state);
		//
		// 	// Rebuild (to add/remove) the updated texts.
		// 	let nextTexts = R.map((author) => {
		// 		return {
		// 			key: `${textUrl}/${action.text.pid}`,
		// 			value: `${action.text.title} - ${author.value}`
		// 		}
		// 	}, action.text.authors);
		//
		// 	// Insert the new texts into the next state.
		// 	nextState = R.insertAll(index, nextTexts, nextState);
		//
		// 	break;

		default:
			nextState = state;
	}

	return nextState;
}
