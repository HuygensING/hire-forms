import React, { PropTypes } from 'react';
import form from 'hire-forms-form';
import Input from 'hire-forms-input';
import SelectCombo from 'hire-forms-select-combo';

const IdentifierForm = (props) =>
	<ul>
		<li>
			<label>Book</label>
			<SelectCombo
				inputPlaceholder="Add new book"
				onChange={props.handleChange.bind(this, 'type')}
				options={props.identifierTypes}
				value={props.formData.type}
			/>
		</li>
		<li>
			<label>Nr/p</label>
			<Input
				onChange={props.handleChange.bind(this, 'identifier')}
				value={props.formData.identifier}
			/>
		</li>
		{
			(props.addButton != null) ?
				<li>{props.addButton}</li> :
				null
		}
	</ul>;

IdentifierForm.propTypes = {
	addButton: PropTypes.bool,
	formData: PropTypes.object,
	handleChange: PropTypes.func,
};

export default form(IdentifierForm);
