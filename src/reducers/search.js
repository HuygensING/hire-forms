const initialState = {
	facetData: {},
	queries: [],
	results: [],
};

const toObj = (prev, curr) => {
	if (curr.name.substr(-10) === 'date_range') {
		prev[curr.name] = [curr.options[0].lowerLimit, curr.options[0].upperLimit];
	} else {
		prev[curr.name] = curr.options.map((c) => c.name);
	}

	return prev;
};

export default function (state = initialState, action) {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_INITIAL_SEARCH_RESULT':
			action.result.refs = action.result.results;

			nextState = { ...state, ...{
				facetData: action.result.facets.reduce(toObj, {}),
				results: [action.result],
			} };

			break;

		case 'SEARCH_RESULT_CHANGED':
			nextState = { ...state, ...{
				queries: [...state.queries, action.query],
				results: [...state.results, action.result],
			} };

			break;

		default:
	}

	return nextState;
}
