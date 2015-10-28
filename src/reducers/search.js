let initialState = {
	facetData: {},
	queries: [],
	results: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_FACET_DATA":
			state = {...state, ...{
				facetData: action.facetData
			}};

			break;

		case "SEARCH_RESULT_CHANGED":
			state = {...state, ...{
				queries: [...state.queries, action.query],
				results: [...state.results, action.result]
			}};

			break;
	}

	return state;
}