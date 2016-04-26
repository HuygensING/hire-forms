import React, { PropTypes } from "react";
import MultiForm from 'hire-forms-multi-form';
import PersonForm from 'formElements/person';
import {
	personModel,
} from 'src/models';

export default (props) => (
	<ul className="codex-form">
		<li className="well">
			<label>Donors</label>
			<MultiForm
				addButtonValue="+"
				attr={"donors"}
				component={PersonForm}
				model={personModel}
				onChange={props.formChangeKey}
				onDelete={props.formDeleteKey}
				persons={props.persons}
				values={props.codex.donors}
			/>
		</li>
		<li className="well">
			<label>Patrons</label>
			<MultiForm
				addButtonValue="+"
				attr={"patrons"}
				component={PersonForm}
				model={personModel}
				onChange={props.formChangeKey}
				onDelete={props.formDeleteKey}
				persons={props.persons}
				values={props.codex.patrons}
			/>
		</li>
	</ul>
);
