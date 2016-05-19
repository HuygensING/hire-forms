import React from 'react';
import Select from 'hire-forms-select';
import Textarea from 'hire-forms-textarea';
import form from 'hire-forms-form';

const MarginTypeForm = (props) =>
	<ul className="margin-type-form">
		<li>
			<label>Type</label>
			<div>
				<Select
					onChange={props.handleChange.bind(this, 'type')}
					options={props.facetData.facet_s_marg_typology}
					value={props.codex.type}
				/>
			</div>
		</li>
		<li>
			<label>Quantification</label>
			<Select
				onChange={props.handleChange.bind(this, 'quantification')}
				options={props.facetData.facet_s_marg_typology_quant}
				value={props.codex.quantification}
			/>
		</li>
		<li>
			<label>Remarks</label>
			<div>
				<Textarea
					onChange={props.handleChange.bind(this, 'remarks')}
					value={props.codex.remarks}
				/>
			</div>
		</li>
	</ul>;

MarginTypeForm.propTypes = {
	codex: React.PropTypes.object,
	facetData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
};

export default form(MarginTypeForm);
