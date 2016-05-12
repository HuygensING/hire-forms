import xhr from 'xhr';
import { personListUrl } from 'src/config';

export const updatePerson = (person) => (dispatch) =>
	dispatch({
		type: 'UPDATE_PERSON',
		person,
	});

export const fetchPersons = () => (dispatch) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url: personListUrl,
	};

	const done = (err, resp, body) =>
		dispatch({
			type: 'RECEIVE_PERSONS',
			persons: JSON.parse(body),
		});

	xhr(options, done);
};
