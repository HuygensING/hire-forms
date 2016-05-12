import React from 'react';
import form from 'hire-forms-form';
import Checkbox from 'hire-forms-checkbox';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Locality from './locality';
import DateElement from 'formElements/date';

function DateAndLocalityForm(props) {
	const model = props.formData;

	const date = props.showDate ?
		<DateElement
			onChange={props.handleChange.bind(this, 'date')}
			onInvalid={props.handleInvalid.bind(this, 'date')}
			value={model.date}
		/> :
		null;

	const dateInfo = props.showDate ?
		<li>
			<label>Date source</label>
			<Input
				onChange={props.handleChange.bind(this, "dateInfo")}
				onInvalid={props.handleInvalid.bind(this, "dateInfo")}
				value={model.dateInfo}
			/>
		</li> :
		null;

	return (
		<ul>
			{date}
			{dateInfo}
			<li>
				<label>Region - Place - Scriptorium</label>
				<Locality
					{...props}
					localities={props.localities}
					onChange={props.handleChange.bind(this, "locality")}
					values={model.locality}
				/>
			</li>
			<li>
				<label>Remarks</label>
				<Textarea
					onChange={props.handleChange.bind(this, "remarks")}
					value={model.remarks}
				/>
			</li>
			<li>
				<label>Certain</label>
				<Checkbox
					onChange={props.handleChange.bind(this, "certain")}
					value={model.certain}
				/>
			</li>
		</ul>
	);
}

DateAndLocalityForm.defaultProps = {
	showDate: true,
};

DateAndLocalityForm.propTypes = {
	formData: React.PropTypes.object,
	showDate: React.PropTypes.bool,
};

export default form(DateAndLocalityForm);
