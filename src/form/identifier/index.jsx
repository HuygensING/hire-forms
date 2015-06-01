import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Select from "../../components/select";

import {FORM} from "../../constants";

class Identifier extends Form {
	render() {
		let model = this.props.value;

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
}


Identifier.defaultFormProps = {
	identifier: "",
	type: ""
};

Identifier.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default Identifier;