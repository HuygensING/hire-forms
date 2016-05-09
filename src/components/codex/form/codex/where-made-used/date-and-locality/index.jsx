import React from 'react';
import form from 'hire-forms-form';
import Checkbox from 'hire-forms-checkbox';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Locality from './locality';
import DateElement from 'formElements/date';
import { validateDate } from 'utils/validation';

class DateAndLocalityForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData);
	}

	render() {
		const model = this.props.formData;

		const date = this.props.showDate ?
			<DateElement
				onChange={this.props.handleChange.bind(this, 'date')}
				onInvalid={this.props.handleInvalid.bind(this, 'date')}
				value={model.date}
			/> :
			null;

		const dateInfo = this.props.showDate ?
			<li>
				<label>Date source</label>
				<Input
					onChange={this.props.handleChange.bind(this, "dateInfo")}
					onInvalid={this.props.handleInvalid.bind(this, "dateInfo")}
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
						localities={this.props.localities}
						onChange={this.props.handleChange.bind(this, "locality")}
						values={model.locality}
					/>
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks}
					/>
				</li>
				<li>
					<label>Certain</label>
					<Checkbox
						onChange={this.props.handleChange.bind(this, "certain")}
						value={model.certain}
					/>
				</li>
			</ul>
		);
	}
}

DateAndLocalityForm.defaultProps = {
	showDate: true,
};

DateAndLocalityForm.propTypes = {
	formData: React.PropTypes.object,
	showDate: React.PropTypes.bool,
};

export default form(DateAndLocalityForm);
