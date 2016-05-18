import React, { PropTypes } from 'react';
import form from 'hire-forms-form';
import Input from 'hire-forms-input';
import SelectCombo from 'hire-forms-select-combo';

function IdentifierForm(props) {
	const model = props.formData;

	let addButton = (props.addButton != null) ?
		<li>{props.addButton}</li> :
		null;

	return (
		<ul>
			<li>
				<label>Book</label>
				<SelectCombo
					inputPlaceholder="Add new book"
					onChange={props.handleChange.bind(this, 'type')}
					options={props.identifierTypes}
					value={model.type}
				/>
			</li>
			<li>
				<label>Nr/p</label>
				<Input
					onChange={props.handleChange.bind(this, 'identifier')}
					value={model.identifier}
				/>
			</li>
			{addButton}
		</ul>
	);
}

IdentifierForm.propTypes = {
	addButton: PropTypes.bool,
	formData: PropTypes.object,
	handleChange: PropTypes.func,
};

export default form(IdentifierForm);
