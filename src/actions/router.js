import {fetchCodex} from "./codices";

export function changeRoute(handler, props=[]) {
	return function (dispatch, getState) {
		if ((handler === "codex" || handler === "editCodex") && props[0] != null) {
			dispatch(fetchCodex(props[0]));
		}

		dispatch({
			type: "CHANGE_ROUTE",
			handler: handler,
			props: props
		});
	};
}

export function toggleEdit(edit) {
	return {
		type: "TOGGLE_EDIT",
		edit: edit
	};
}

export function changeTab(label) {
	return {
		type: "CHANGE_TAB",
		label: label
	};
}