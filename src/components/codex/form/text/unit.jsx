import React from 'react';
import form from 'hire-forms-form';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import Autocompolete from 'hire-forms-autocomplete';

const TextUnit = (props) =>
	<ul>
		<li>
			<label>Text</label>
			<Autocompolete
				onChange={props.handleChange.bind(this, 'text')}
				options={props.texts}
				placeholder="Search text..."
				value={props.formData.text}
			/>
		</li>
		<li>
			<label>Title in codex</label>
			<Input
				onChange={props.handleChange.bind(this, 'titleInCodex')}
				value={props.formData.titleInCodex}
			/>
		</li>
		<li>
			<label>Incipit</label>
			<Input
				onChange={props.handleChange.bind(this, 'incipit')}
				value={props.formData.incipit}
			/>
		</li>
		<li>
			<label>Explicit</label>
			<Input
				onChange={props.handleChange.bind(this, 'explicit')}
				value={props.formData.explicit}
			/>
		</li>
		<li>
			<label>Pages</label>
			<Input
				onChange={props.handleChange.bind(this, 'pages')}
				value={props.formData.pages}
			/>
		</li>
		<li>
			<label>State of preservation</label>
			<Input
				onChange={props.handleChange.bind(this, 'stateOfPreservation')}
				value={props.formData.stateOfPreservation}
			/>
		</li>
		<li>
			<label>Remarks</label>
			<Textarea
				onChange={props.handleChange.bind(this, 'remarks')}
				value={props.formData.remarks}
			/>
		</li>
	</ul>;

export default form(TextUnit);
