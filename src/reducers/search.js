let initialState = {
	facetData: {}
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_FACET_DATA":
			state = {...state, ...{facetData: action.facetData}};

			break;
	}

	return state;
}