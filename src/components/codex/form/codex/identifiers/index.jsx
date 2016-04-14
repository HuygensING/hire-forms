import React from "react";
import MultiForm from "hire-forms-multi-form";
import IdentifierForm from "../../elements/identifier";
import LocationForm from "../../elements/location";
import Input from "hire-forms-input";

import {
	identifierModel,
	locationModel
} from "../../../../../models";

class IdentifiersForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.value.locations !== nextProps.value.locations
			|| this.props.value.identifiers !== nextProps.value.identifiers
	}

	render() {
		let model = this.props.value;

		return (
			<ul className="codex-form">
				<li className="well">
					<label>Codex {model.pid}</label>
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
					<label>Described in</label>
					<MultiForm
						addButtonValue="+"
						attr={"identifiers"}
						model={identifierModel}
						onChange={this.props.onFormChangeKey}
						onDelete={this.props.onFormDeleteKey}
						values={model.identifiers}
						component={IdentifierForm} />
				</li>
					{/*<h2>Content summary</h2>
					<ul className="codex-form">
						<LiTextarea
							onChange={this.props.onFormChangeKey.bind(this, "contentSummary")}
							value={model.contentSummary}/>
					</ul>*/}
				<li className="well">
					<label>Number of pages</label>
					<Input
						onChange={this.props.onFormChangeKey.bind(this, "folia")}
						value={model.folia} />
				</li>
			</ul>
		)
	}
}

export default IdentifiersForm;
