import React from 'react';
import MultiForm from 'hire-forms-multi-form';
import LiTextarea from 'formElements/li-textarea';
import DateAndLocalityForm from 'formElements/date-and-locality';
import {
	dateAndLocalityModel,
} from 'src/models';

function WhereMadeUsed(props) {
	const model = props.codex;

	return (
		<ul className="codex-form">
			<li className="well">
				<label>Origin</label>
				<DateAndLocalityForm
					attr={'origin'}
					formData={model.origin}
					onChange={props.formChangeKey}
					onInvalid={props.formInvalid}
					showDate={false}
				/>
			</li>
			<li className="well">
				<label>Provenance</label>
				<MultiForm
					addButtonValue="+"
					attr={'provenances'}
					component={DateAndLocalityForm}
					model={dateAndLocalityModel}
					onChange={props.formChangeKey}
					onDelete={props.formDeleteKey}
					onInvalid={props.formInvalid}
					values={model.provenances}
				/>
			</li>
			<LiTextarea
				label="Remarks"
				onChange={props.formChangeKey.bind(this, 'dateAndLocaleRemarks')}
				value={model.dateAndLocaleRemarks}
			/>
		</ul>
	);
}

export default WhereMadeUsed;
