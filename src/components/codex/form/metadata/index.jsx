import React from 'react';

import Select from 'hire-forms-select';
import Textarea from 'hire-forms-textarea';
import MultiSelect from 'hire-forms-multi-select';

import form from 'hire-forms-form';

const MetadataForm = (props) =>
	<ul className="metadata-form">
		<li className="well">
			<label>Examined</label>
			<div>
				<Select
					onChange={props.handleChange.bind(this, 'examinationLevel')}
					options={['Catalogue only', 'Digital only', 'In person']}
					value={props.formData.examinationLevel}
				/>
			</div>
		</li>
		<li className="well">
			<label>Interesting for</label>
			<MultiSelect
				onChange={props.handleChange.bind(this, 'interestingFor')}
				options={['Evina', 'Irene', 'Mariken']}
				values={props.formData.interestingFor}
			/>
		</li>
		<li className="well">
			<label>Private remarks</label>
			<div>
				<Textarea
					onChange={props.handleChange.bind(this, "userRemarks")}
					value={props.formData.userRemarks}
				/>
			</div>
		</li>
	</ul>;

export default form(MetadataForm);
