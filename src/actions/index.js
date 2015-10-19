import store from "../store";

import {saveCodex, setCodex} from "./codices";

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

	onSave: () =>
		store.dispatch(saveCodex()),

	onTabChange: (...args) =>
		console.log(...args),

	onUpdatePerson: (person) =>
		store.dispatch({
			type: "UPDATE_PERSON",
			person: person
		})
};