
import xhr from 'xhr';
import { baseUrl, textListUrl } from 'src/config';

export const updateText = (text) => (dispatch, getState) => {
	if (text.authors.length && !text.authors[0].hasOwnProperty('key')) {
		text.authors = text.authors.map((t) => {
			const persons = getState().persons;
			const key = `${baseUrl}${t['^person'].substr(1)}`;
			const person = persons.find((p) => p.key === key);
			return {
				key,
				value: person.value,
			};
		});
	}
	return dispatch({
		type: 'UPDATE_TEXT',
		text,
	});
};

export const fetchTexts = () => (dispatch) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url: textListUrl,
	};

	const done = (err, resp, body) =>
		dispatch({
			type: 'RECEIVE_TEXTS',
			texts: JSON.parse(body),
		});

	xhr(options, done);
};
