import store from "../store";

import {setCodex} from "./codices";

export default {
	onSetCodex: (id) =>
		store.dispatch(setCodex(id)),

	onFormChangeKey: (key, value) =>
		console.log(key, value),

	onFormDeleteKey: (key) =>
		console.log(key),

	onFormInvalid: (...args) =>
		console.log(...args),

	onResultSelect: (item) =>
		console.log(item),

	onTabChange: (...args) =>
		console.log(...args)
};