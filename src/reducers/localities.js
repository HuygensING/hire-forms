const initialState = [];

export default function (state = initialState, action) {
	let nextState = state;

	switch (action.type) {
		case 'ADD_LOCALITY': {
			nextState = state.concat(action.locality);
			break;
		}
		case 'GET_LOCALITIES': {
			nextState = action.localities;
			break;
		}
		default:
	}

	return nextState;
}
