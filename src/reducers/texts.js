let initialState = [];

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_TEXTS":
			state = action.texts.map((text) => {
				text.key = text.id;
				text.value = text.label;

				delete text.id;
				delete text.label;

				return text;
			});

			break;
	}

	return state;
}