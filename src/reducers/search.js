const initialState = {
	facetData: {},
	queries: [],
	results: [],
};

const toObj = (prev, curr) => {
	const nextPrev = prev;
	if (curr.name.substr(-10) === 'date_range') {
		nextPrev[curr.name] = [curr.options[0].lowerLimit, curr.options[0].upperLimit];
	} else {
		nextPrev[curr.name] = curr.options.map((c) => c.name);
	}

	return nextPrev;
};

export default function (state = initialState, action) {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_INITIAL_SEARCH_RESULT': {
			const nextAction = action;
			nextAction.result.refs = nextAction.result.results;

			nextState = { ...state, ...{
				facetData: nextAction.result.facets.reduce(toObj, {}),
				results: [nextAction.result],
			} };

			break;
		}

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
