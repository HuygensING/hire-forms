export const formChangeKey = (key, value) => (
	{
		type: 'CODEX_SET_KEY',
		key,
		value,
	}
);

export const formChangeInteger = (key, value) => (
	{
		type: 'CODEX_SET_KEY',
		key,
		value: isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10),
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
