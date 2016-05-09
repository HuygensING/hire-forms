import R from "ramda";

let initialState = [];

export default function(state=initialState, action) {
	switch (action.type) {
		// case "RECEIVE_PERSONS":
		// 	state = action.persons.map((person) => {
		// 		person.key = person.id;
		// 		person.value = person.label;
		//
		// 		delete person.id;
		// 		delete person.label;
		//
		// 		return person;
		// 	});
		//
		// 	break;

		case "UPDATE_PERSON":
			state = R.adjust(
				(person) => {
					person.value = action.person.name;

					return person;
				},
				R.findIndex((person) => {
					return person.key.split("/").slice(-1)[0] === action.person.pid
				}, state),
				state
			);

			break;
	}

	return state;
}
