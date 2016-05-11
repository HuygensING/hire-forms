import Immutable from 'immutable';
import R from 'ramda';
import { castArray } from 'utils';
import { codexModel, marginUnitModel, textUnitModel } from 'src/models';

const initialState = {
	all: [],
	current: codexModel,
	requesting: false,
	saving: false,
};

export default function (state = initialState, action) {
	let nextState;

	switch (action.type) {
		case 'REQUEST_CODEX':
			nextState = { ...state, ...{ requesting: true } };
			break;

		case 'SAVE_CODEX':
			nextState = { ...state, ...{ saving: true } };
			break;

		case 'SAVED_CODEX':
			nextState = { ...state, ...{ saving: false } };
			break;

		case 'RECEIVE_CODEX':
			nextState = { ...state, ...{
				all: [...state.all, action.response],
				current: { ...codexModel, ...action.response },
				requesting: false,
			} };
			break;

		case 'REMOVE_CODEX':
			nextState = { ...state, ...{
				all: R.reject((cod) => (cod.pid === action.id), state.all),
				current: codexModel,
				requesting: false,
			} };
			break;

		case 'CODEX_SET_KEY': {
			const key = R.prepend('current', castArray(action.key));

			nextState = new Immutable.fromJS(state);
			nextState = nextState.setIn(key, action.value);
			nextState = nextState.toJS();

			break;
		}

		case 'CODEX_DELETE_KEY': {
			const current = Immutable.fromJS(state.current);
			const key = castArray(action.key);

			nextState = { ...state, ...{
				current: current.deleteIn(key).toJS(),
			} };

			break;
		}

		case 'SET_CURRENT_CODEX':
			nextState = { ...state, ...{
				current: action.current,
			} };

			break;

		case 'CODEX_DELETED':
			nextState = { ...state, ...{
				all: state.all.filter((codex) => codex._id !== action.id),
				current: codexModel,
			} };

			break;

		case 'NEW_CODEX':
			nextState = { ...state, ...{
				current: codexModel,
			} };

			break;

		case 'ADD_TEXT_UNIT': {
			const model = action.unitType === 'text' ? textUnitModel : marginUnitModel;
			const prop = action.unitType === 'text' ? 'textUnits' : 'marginUnits';
			const index = state.current[prop].length;

			nextState = new Immutable.fromJS(state);
			nextState = nextState.setIn(['current', prop, index], model);
			nextState = nextState.toJS();

			break;
		}

		case 'INVALID_CODEX': {
			nextState = { ...state, ...{
				current: { ...state.current, ...{
					errors: action.errors,
				} },
			} };

			break;
		}

		default:
			nextState = state;
	}

	return nextState;
}
