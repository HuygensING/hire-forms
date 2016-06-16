import React from 'react';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Checkbox from 'hire-forms-checkbox';
import Autocomplete from 'hire-forms-autocomplete';
import Select from 'hire-forms-select';
import form from 'hire-forms-form';

const PersonForm = (props) =>
	<ul>
		<li>
			<label>Person</label>
			<Autocomplete
				onChange={props.handleChange.bind(this, "person")}
				options={props.persons}
				placeholder="Search person..."
				value={props.formData.person}
			/>
		</li>
		<li>
			<label>Certain</label>
			<Checkbox
				onChange={props.handleChange.bind(this, "certain")}
				value={props.formData.certain}
			/>
		</li>
		<li>
			<label>Folia range</label>
			<Input
				onChange={props.handleChange.bind(this, "pages")}
				value={props.formData.pages}
			/>
		</li>
		<li>
			<label>Remarks</label>
			<Textarea
				onChange={props.handleChange.bind(this, "remarks")}
				value={props.formData.remarks}
			/>
		</li>
		{
			(props.addButton != null) ?
				<li>{props.addButton}</li> :
				null
		}
	</ul>;

export default form(PersonForm);
