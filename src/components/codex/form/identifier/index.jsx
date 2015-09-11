import React from "react";
import Immutable from "immutable";

import form from "hire-forms-form";

import Input from "hire-forms-input";
import Select from "hire-forms-select";

let identifier = new Immutable.Map({
	identifier: "",
	type: ""
});

class IdentifierForm extends React.Component {
// let IdentifierForm = React.createClass({
// 	mixins: [HireForm],

	render() {
		let model = this.props.value;

		return (
			<ul>
				<li>
					<label>Type</label>
					<Select
						onChange={this.props.onChange.bind(this, "type")}
						options={["(empty)", "Bergmann", "Bischoff", "CLA", "KIH"]}
						value={model.type} />
				</li>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.props.onChange.bind(this, "identifier")}
						value={model.identifier} />
				</li>
			</ul>
		);
	}
}

export default form(IdentifierForm);