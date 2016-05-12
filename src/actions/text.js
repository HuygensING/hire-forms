
import xhr from 'xhr';
import { textListUrl } from 'src/config';

export const updateText = (text) => (dispatch) =>
	dispatch({
		type: 'UPDATE_TEXT',
		text,
	});

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
