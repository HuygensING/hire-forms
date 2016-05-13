import xhr from 'xhr';
import store from '../store';
import { searchUrl } from 'src/config';

export const resultChange = (result, query) =>
	store.dispatch({
		type: 'SEARCH_RESULT_CHANGED',
		result,
		query,
	});

export const resultSelect = item => console.log(item);

export const fetchInitialSearchResult = () => (dispatch) => {
	const postOptions = {
		body: '{"facetValues":[],"term":"","sortParameters":[]}',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		method: 'post',
		url: searchUrl,
	};

	const postDone = (error, response) => {
		const getOptions = {
			headers: {
				Accept: 'application/json',
			},
			url: `${response.headers.location}?rows=50`,
		};

		const getDone = (err, resp, body) => {
			dispatch({
				type: 'RECEIVE_INITIAL_SEARCH_RESULT',
				result: JSON.parse(body),
			});
		};

		xhr(getOptions, getDone);
	};

	xhr(postOptions, postDone);
};
