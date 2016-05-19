import React from 'react';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Checkbox from 'hire-forms-checkbox';
import Select from 'hire-forms-select';
import form from 'hire-forms-form';

const PersonForm = (props) =>
	<ul>
		<li>
			<label>Person</label>
			<Select
				onChange={this.props.handleChange.bind(this, "person")}
				options={this.props.persons}
				value={props.formData.person}
			/>
		</li>
		<li>
			<label>Certain</label>
			<Checkbox
				onChange={this.props.handleChange.bind(this, "certain")}
				value={props.formData.certain}
			/>
		</li>
		<li>
			<label>Folia range</label>
			<Input
				onChange={this.props.handleChange.bind(this, "pages")}
				value={props.formData.pages}
			/>
		</li>
		<li>
			<label>Remarks</label>
			<Textarea
				onChange={this.props.handleChange.bind(this, "remarks")}
				value={props.formData.remarks}
			/>
		</li>
		{
			(this.props.addButton != null) ?
				<li>{this.props.addButton}</li> :
				null
		}
	</ul>;

export default form(PersonForm);
