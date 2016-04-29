export const formChangeKey = (key, value) => (
	{
		type: 'CODEX_SET_KEY',
		key,
		value,
	}
);

export const formDeleteKey = (key) => (
	{
		type: 'CODEX_DELETE_KEY',
		key,
	}
);

export const formInvalid = (...args) => {
	console.log(...args);

	return {
		type: 'CODEX_INVALID',
	};
};
