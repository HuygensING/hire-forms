import store from '../store';

export const resultChange = (result, query) =>
	store.dispatch({
		type: 'SEARCH_RESULT_CHANGED',
		result,
		query,
	});

export const resultSelect = item => console.log(item);
