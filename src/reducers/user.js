const initialState = {
	authenticated: false,
	token: null,
};

export default function (state = initialState, action) {
	let nextState = state;

	switch (action.type) {
		case 'USER_LOGIN':
			nextState = action.userData;

			break;

		default:
	}

	return nextState;
}
