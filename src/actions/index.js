import store from "../store";

import {setCodex} from "./codices";

export default {
	onSetCodex: (id) =>
		store.dispatch(setCodex(id)),

	onFormChangeKey: (key, value) =>
		store.dispatch({
			type: "CODEX_SET_KEY",
			key: key,
			value: value
		}),

	onFormDeleteKey: (key) =>
		store.dispatch({
			type: "CODEX_DELETE_KEY",
			key: key
		}),

	onFormInvalid: (...args) =>
		console.log(...args),

	onResultSelect: (item) =>
		console.log(item),

	onTabChange: (...args) =>
		console.log(...args)
};