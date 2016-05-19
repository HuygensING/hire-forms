import React from 'react';
import MultiForm from 'hire-forms-multi-form';
import LiTextarea from 'formElements/li-textarea';
import DateAndLocalityForm from './date-and-locality';
import {
	dateAndLocalityModel,
} from 'src/models';

export default (props) =>
	<ul className="codex-form">
		<li className="well">
			<label>Origin</label>
			<DateAndLocalityForm
				{...props}
				attr={'origin'}
				formData={props.codex.origin}
				onChange={props.formChangeKey}
				onInvalid={props.formInvalid}
				showDate={false}
			/>
		</li>
		<li className="well">
			<label>Provenance</label>
			<MultiForm
				{...props}
				addButtonValue="+"
				attr={'provenances'}
				component={DateAndLocalityForm}
				model={dateAndLocalityModel}
				onChange={props.formChangeKey}
				onDelete={props.formDeleteKey}
				onInvalid={props.formInvalid}
				values={props.codex.provenances}
			/>
		</li>
		<LiTextarea
			label="Remarks"
			onChange={props.formChangeKey.bind(this, 'dateAndLocaleRemarks')}
			value={props.codex.dateAndLocaleRemarks}
		/>
	</ul>;
