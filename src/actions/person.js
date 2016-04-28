export const updatePerson = (person) => (dispatch) =>
	dispatch({
		type: 'UPDATE_PERSON',
		person,
	});
