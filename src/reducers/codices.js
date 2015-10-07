import Immutable from "immutable";
import R from "ramda";
import {castArray} from "../utils";
// import {parseIncomingCodex} from "../stores/parsers/codex";

import {codexModel} from "../models";

let initialState = {
	all: [],
	current: codexModel,
	requesting: false
};

export default function(state=initialState, action) {
	let current, key;


	switch (action.type) {

		case "REQUEST_CODEX":
			state = {...state, ...{requesting: true}};

			break;

		case "RECEIVE_CODEX":
			state = {...state, ...{
				all: [...state.all, action.response],
				current: action.response,
				requesting: false
			}};

			break;

		case "CODEX_SET_KEY":
			let key = R.prepend("current", castArray(action.key));
			let nstate = R.assocPath(key, action.value, state);

			console.log(state.current !== nstate.current);

			state = nstate;
			break;

		case "CODEX_DELETE_KEY":
			current = Immutable.fromJS(state.current);
			key = castArray(action.key);

			state = {...state, ...{
				current: current.deleteIn(key).toJS()
			}};

			break;

		case "SET_CURRENT_CODEX":
			state = {...state, ...{
				current: action.current
			}};

			break;

		case "CODEX_DELETED":
			state = {...state, ...{
				all: state.all.filter((codex) => codex._id !== action.id),
				current: codexModel
			}};

			break;

		case "NEW_CODEX":
			state = {...state, ...{
				current: codexModel
			}};

			break;
	}

	return state;
}