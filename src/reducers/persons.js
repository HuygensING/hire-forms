const initialState = [];

export default function (state = initialState, action) {
	let nextState;

	switch (action.type) {
		case 'RECEIVE_PERSONS':
			nextState = action.persons.map((person) => ({
				key: person.id,
				value: person.label,
			}));

			break;

		case 'UPDATE_PERSON': {
			const index = state.findIndex((person) =>
				person.key.split('/').slice(-1)[0] === action.person.pid
			);

			// Only the name is updated in the list, because that is the only
			// prop that is showed in the list.
			const updatedPerson = state[index];
			updatedPerson.value = action.person.name;

			// Clone the state, otherwise it won't update.
			nextState = state.slice();

			// Replace person at index;
			nextState.splice(index, 1, updatedPerson);

			break;
		}

		default:
			nextState = state;
	}

	return nextState;
}
