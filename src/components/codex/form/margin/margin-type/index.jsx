import React from "react";
import Select from "hire-forms-select";
import Textarea from "hire-forms-textarea";
import form from "hire-forms-form";

class MarginTypeForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = this.props.formData;

		return (
			<ul className="margin-type-form">
				<li>
					<label>Type</label>
					<div>
						<Select
							onChange={this.props.handleChange.bind(this, "type")}
							options={this.props.facetData.facet_s_marg_typology}
							value={model.type} />
					</div>
				</li>
				<li>
					<label>Quantification</label>
					<Select
						onChange={this.props.handleChange.bind(this, "quantification")}
						options={this.props.facetData.facet_s_marg_typology_quant}
						value={model.quantification} />
				</li>
				<li>
					<label>Remarks</label>
					<div>
						<Textarea
							onChange={this.props.handleChange.bind(this, "remarks")}
							value={model.remarks} />
					</div>
				</li>
			</ul>
		);
	}
}

export default form(MarginTypeForm);
