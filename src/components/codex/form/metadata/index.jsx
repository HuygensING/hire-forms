import React from 'react';

import Select from 'hire-forms-select';
import Textarea from 'hire-forms-textarea';
import MultiSelect from 'hire-forms-multi-select';

import form from 'hire-forms-form';

class MetadataForm extends React.Component {
	render() {
		const model = this.props.formData;

		return (
			<ul className="metadata-form">
				<li className="well">
					<label>Examined</label>
					<div>
						<Select
							onChange={this.props.handleChange.bind(this, 'examinationLevel')}
							options={['Catalogue only', 'Digital only', 'In person']}
							value={model.examinationLevel}
						/>
					</div>
				</li>
				<li className="well">
					<label>Interesting for</label>
					<MultiSelect
						onChange={this.props.handleChange.bind(this, 'interestingFor')}
						options={['Evina', 'Irene', 'Mariken']}
						values={model.interestingFor}
					/>
				</li>
				<li className="well">
					<label>Private remarks</label>
					<div>
						<Textarea
							onChange={this.props.handleChange.bind(this, "userRemarks")}
							value={model.userRemarks} />
					</div>
				</li>
			</ul>
		);
	}
}

export default form(MetadataForm);
