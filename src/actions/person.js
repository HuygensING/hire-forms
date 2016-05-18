import { fetch } from 'utils/fetch';
import { personListUrl } from 'src/config';

export const updatePerson = (person) => (dispatch) =>
	dispatch({
		type: 'UPDATE_PERSON',
		person,
	});

export const fetchPersons = () => (dispatch) =>
	fetch(personListUrl, (persons) =>
		dispatch({
			type: 'RECEIVE_PERSONS',
			persons,
		})
	);
