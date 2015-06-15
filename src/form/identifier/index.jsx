import React from "react";
import Immutable from "immutable";

import HireForm from "hire-forms-form";

import Input from "hire-forms-input";
import Select from "hire-forms-select";

import {FORM} from "../../constants";

let identifier = new Immutable.Map({
	identifier: "",
	type: ""
});

let IdentifierForm = React.createClass({
	mixins: [HireForm],

	render() {
		let model = identifier.merge(this.props.value);

		return (
			<ul className={FORM}>
				<li>
					<label>Type</label>
					<Select
						onChange={this.handleChange.bind(this, "type")}
						options={["(empty)", "Bergmann", "Bischoff", "CLA", "KIH"]}
						value={model.get("type")} />
				</li>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.handleChange.bind(this, "identifier")}
						value={model.get("identifier")} />
				</li>
			</ul>
		);
	}
});

export default IdentifierForm;