let initialState = {
	authenticated: false,
	token: null,
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "USER_LOGIN":
			state = action.userData;

			break;
	}

	return state;
}