import store from '../store';

export const formChangeKey = (key, value) =>
	store.dispatch({
		type: 'CODEX_SET_KEY',
		key,
		value,
	});

export const formDeleteKey = (key) =>
	store.dispatch({
		type: 'CODEX_DELETE_KEY',
		key,
	});

export const formInvalid = (...args) => console.log(...args);
