import React from "react";
import MultiForm from "hire-forms-multi-form";
import IdentifierForm from "../../identifier";
import LocationForm from "../../location";

import {
	identifierModel,
	locationModel
} from "../../../../../models";

class IdentifiersForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		console.log(this.props.value.locations === nextProps.value.locations);
		console.log(this.props.value.identifiers === nextProps.value.identifiers);
		return this.props.value.locations !== nextProps.value.locations
			|| this.props.value.identifiers !== nextProps.value.identifiers
	}

	render() {
		let model = this.props.value;

		return (
			<ul className="codex-form">
				<li className="well">
					<label>Codex</label>
					<MultiForm
						addButtonValue="+"
						attr={"locations"}
						model={locationModel}
						onChange={this.props.onFormChangeKey}
						onDelete={this.props.onFormDeleteKey}
						values={model.locations}
						component={LocationForm} />
				</li>
				<li className="well">
					<label>Identifier</label>
					<MultiForm
						addButtonValue="+"
						attr={"identifiers"}
						model={identifierModel}
						onChange={this.props.onFormChangeKey}
						onDelete={this.props.onFormDeleteKey}
						values={model.identifiers}
						component={IdentifierForm} />
				</li>
			</ul>
		)
	}
}

export default IdentifiersForm;