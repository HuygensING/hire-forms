let STATE = {
	codex: {
		visible: false
	},
	editCodex: {
		visible: false
	},
	path: "",
	search: {
		visible: false
	},
	visibleHandler: null
};

let getNextPath = function(state) {
	if (state.visibleHandler == null) {
		return "";
	}

	let path = (state.visibleHandler === "editCodex") ?
		"codex" :
		state.visibleHandler;

	let id = state[state.visibleHandler].id;

	if (id != null) {
		path = `${path}/${id}`;
	} else if (state[state.visibleHandler].edit) {
		path = `${path}/new`;
	}

	if (state[state.visibleHandler].tab != null) {
		path += "/" + state[state.visibleHandler].tab;
	}

	if (state.visibleHandler === "editCodex") {
		path += "/edit";
	}

	// console.log({
	// 	type: type,
	// 	id: id,
	// 	tab: state[state.visibleHandler].tab,
	// 	path: path
	// });

	return path;
};

let handleChangeRoute = function(state, handler, props) {
	let nextPageProps = {
		visible: true
	};

	// if (handler === "author" && props[0] === "new") {
	// 	handler = "editAuthor";
	// }

	// if (handler === "publication" && props[0] === "new") {
	// 	handler = "editPublication";
	// }

	// if (handler === "editCodex") {
	// 	handler = "codex";
	// 	nextPageProps.edit = true;
	// }

	if (props.length) {
		nextPageProps.id = (props[0] === "new") ? null : props[0];

		// Set tab to undefined if the value is null. See: https://github.com/facebook/react/issues/2166#issuecomment-55040147
		if (props[1] === null) {
			props[1] = undefined;
		}

		nextPageProps.tab = props[1];
	}

	let nextState = {
		[handler]: {...state[handler], ...nextPageProps},
		visibleHandler: handler
	};

	// Set the current visible component to visible is false
	// in the next state.
	if (state.visibleHandler != null && state.visibleHandler !== handler) {
		if (!nextState.hasOwnProperty(state.visibleHandler)) {
			nextState[state.visibleHandler] = {};
		}

		nextState[state.visibleHandler].visible = false;
	}

	return nextState;
};

export default function(state=STATE, action) {
	let nextState = {};

	switch (action.type) {
		case "CHANGE_ROUTE":
			nextState = handleChangeRoute(state, action.handler, action.props);

			break;

		case "TOGGLE_EDIT":
			nextState = {
				[state.visibleHandler]: {...state[state.visibleHandler],
					edit: action.edit
				}
			};

			break;

		case "CHANGE_TAB":
			nextState = {
				[state.visibleHandler]: {...state[state.visibleHandler],
					tab: action.label.toLowerCase()
				}
			};

			break;
	}

	nextState = {...state, ...nextState};
	nextState.path = getNextPath(nextState);

	return nextState;
}