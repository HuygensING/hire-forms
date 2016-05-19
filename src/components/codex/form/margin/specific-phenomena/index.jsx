import React from 'react';
import Select from 'hire-forms-select';
import Textarea from 'hire-forms-textarea';
import form from 'hire-forms-form';

const SpecificPhenomenaForm = (props) =>
	<ul className="margin-type-form">
		<li>
			<label>Type</label>
			<div>
				<Select
					onChange={props.handleChange.bind(this, 'type')}
					options={props.facetData.facet_s_margin_phenomenon}
					value={props.formData.type}
				/>
			</div>
		</li>
		<li>
			<label>Quantification</label>
			<Select
				onChange={props.handleChange.bind(this, 'quantification')}
				options={props.facetData.facet_s_marg_phenomena_quant}
				value={props.formData.quantification}
			/>
		</li>
		<li>
			<label>Remarks</label>
			<div>
				<Textarea
					onChange={props.handleChange.bind(this, 'remarks')}
					value={props.formData.remarks}
				/>
			</div>
		</li>
	</ul>;

export default form(SpecificPhenomenaForm);
