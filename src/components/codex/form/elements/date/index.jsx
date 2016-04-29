import React, { PropTypes } from 'react';
import Input from 'hire-forms-input';
import { validateDate } from 'utils/validation';
import modal from 'formElements/modal';
import dateHelp from './date-help';

const showModal = () =>
	modal({
		confirmLabel: 'OK',
		cancelLabel: null,
		html: dateHelp,
		width: 500,
	});

const DateElement = ({ onChange, onInvalid, value }) => (
	<li className="date-row">
		<label>Date</label>
		<Input
			onChange={onChange}
			onInvalid={onInvalid}
			validate={validateDate}
			value={value}
		/>
		<span onClick={showModal}>?</span>
	</li>
);

DateElement.propTypes = {
	onChange: PropTypes.func,
	onInvalid: PropTypes.func,
	value: PropTypes.string,
};

export default DateElement;
