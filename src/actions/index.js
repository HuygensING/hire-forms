import store from '../store';
import { saveCodex, setCodex, removeCodex } from './codices';

export default {
	onFormChangeKey: (key, value) =>
		store.dispatch({
			type: 'CODEX_SET_KEY',
			key,
			value,
		}),

	onFormDeleteKey: (key) =>
		store.dispatch({
			type: 'CODEX_DELETE_KEY',
			key,
		}),

	onFormInvalid: (...args) => console.log(...args),

	onRemoveCodex: () =>
		store.dispatch(removeCodex()),

	onResultChange: (result, query) =>
		store.dispatch({
			type: 'SEARCH_RESULT_CHANGED',
			result,
			query,
		}),

	onResultSelect: (item) => console.log(item),

	onSave: () =>
		store.dispatch(saveCodex()),

	onSetCodex: (id) =>
		store.dispatch(setCodex(id)),

	onTabChange: (...args) => console.log(...args),

	onUpdatePerson: (person) =>
		store.dispatch({
			type: 'UPDATE_PERSON',
			person,
		}),

	onUpdateText: (text) =>
		store.dispatch({
			type: 'UPDATE_TEXT',
			text,
		}),

	onUserLogin: (userData) =>
		store.dispatch({
			type: 'USER_LOGIN',
			userData,
		}),
};
