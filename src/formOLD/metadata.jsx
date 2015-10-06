import React from "react";

import Select from "hire-forms-select";
import Textarea from "hire-forms-textarea";
import MultiSelect from "hire-forms-multi-select";

import form from "hire-forms-form";

import {FORM} from "../constants";

class MetadataForm extends React.Component {
// let MetadataForm = React.createClass({
	// mixins: [HireForm],

	render() {
		let model = this.props.value;

		return (
			<ul className={"metadata-form " + FORM}>
				<li className="well">
					<label>Examined</label>
					<div>
						<Select
							onChange={this.handleChange.bind(this, "examinationLevel")}
							options={["Catalogue only", "Digital only", "In person"]}
							value={model.get("examinationLevel")} />
					</div>
				</li>
				<li className="well">
					<label>Interesting for</label>
					<MultiSelect
						onChange={this.handleChange.bind(this, "interestingFor")}
						options={["Evina", "Irene", "Mariken"]}
						values={model.get("interestingFor").toArray()} />
				</li>
				<li className="well">
					<label>Private remarks</label>
					<div>
						<Textarea
							onChange={this.handleChange.bind(this, "userRemarks")}
							value={""} />
					</div>
				</li>
			</ul>
		);
	}
}

export default form(MetadataForm);