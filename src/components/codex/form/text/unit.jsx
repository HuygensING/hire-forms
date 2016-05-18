import React from 'react';
import form from 'hire-forms-form';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Select from 'hire-forms-select';

function TextUnit(props) {
	const model = props.formData;

	return (
		<ul>
			<li>
				<label>Text</label>
				<Select
					onChange={props.handleChange.bind(this, 'text')}
					options={props.texts}
					value={model.text}
				/>
			</li>
			<li>
				<label>Title in codex</label>
				<Input
					onChange={props.handleChange.bind(this, 'titleInCodex')}
					value={model.titleInCodex}
				/>
			</li>
			<li>
				<label>Incipit</label>
				<Input
					onChange={props.handleChange.bind(this, 'incipit')}
					value={model.incipit}
				/>
			</li>
			<li>
				<label>Explicit</label>
				<Input
					onChange={props.handleChange.bind(this, 'explicit')}
					value={model.explicit}
				/>
			</li>
			<li>
				<label>Pages</label>
				<Input
					onChange={props.handleChange.bind(this, 'pages')}
					value={model.pages}
				/>
			</li>
			<li>
				<label>State of preservation</label>
				<Input
					onChange={props.handleChange.bind(this, 'stateOfPreservation')}
					value={model.stateOfPreservation}
				/>
			</li>
			<li>
				<label>Remarks</label>
				<Textarea
					onChange={props.handleChange.bind(this, 'remarks')}
					value={model.remarks}
				/>
			</li>
		</ul>
	);
}

export default form(TextUnit);
