import store from "../store";

import {saveCodex, setCodex, removeCodex} from "./codices";

export default {
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

	onNewCodex: () =>
		store.dispatch({
			type: "NEW_CODEX"
		}),

	onRemoveCodex: () =>
		store.dispatch(removeCodex()),

	onResultChange: (result, query) => {
		store.dispatch({
			type: "SEARCH_RESULT_CHANGED",
			result: result,
			query: query
		})
	},

	onResultSelect: (item) =>
		console.log(item),

	onSave: () =>
		store.dispatch(saveCodex()),

	onSetCodex: (id) =>
		store.dispatch(setCodex(id)),

	onTabChange: (...args) =>
		console.log(...args),

	onUpdatePerson: (person) =>
		store.dispatch({
			type: "UPDATE_PERSON",
			person: person
		}),

	onUpdateText: (text) =>
		store.dispatch({
			type: "UPDATE_TEXT",
			text: text
		}),

	onUserLogin: (userData) =>
		store.dispatch({
			type: "USER_LOGIN",
			userData: userData
		})
};