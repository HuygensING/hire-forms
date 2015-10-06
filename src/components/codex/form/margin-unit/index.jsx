import React from "react";
import cx from "classnames";

import form from "hire-forms-form";
import MultiForm from "hire-forms-multi-form";

// FORM COMPONENTS
import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import SelectList from "hire-forms-select-list";
import MutableList from "hire-forms-mutable-list";

// FORMS
import DateAndLocality from "../date-and-locality";
import Person from "../person";

import {personModel, marginUnitModel} from "../../../../models";

// import marginUnit from "../../stores/models/margin-unit";

class MarginUnit extends React.Component {
// let MarginUnit = React.createClass({
// 	mixins: [HireForm],

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.value !== nextProps.value;
	// }

	render() {
		let model = {...marginUnitModel, ...this.props.value};

		return (
			<ul>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.props.onChange.bind(this, "identifier")}
						value={model.identifier} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.props.onChange.bind(this, "pages")}
						value={model.pages} />
				</li>
				<li>
					<label>Relative date</label>
					<Input
						onChange={this.props.onChange.bind(this, "relativeDate")}
						value={model.relativeDate} />
				</li>
				<li className="well">
					<label>Origin</label>
					<DateAndLocality
						attr={"origin"}
						onChange={this.props.onChange}
						onInvalid={this.props.onInvalid}
						value={model.origin} />
				</li>
				<li>
					<label>Language</label>
					<SelectList
						onChange={this.props.onChange.bind(this, "languages")}
						options={["Latin", "Old High German", "none", "Old Irish", "Old Breton", "Old English"]}
						values={model.languages} />
				</li>
				<li>
					<label>Script</label>
					<SelectList
						onChange={this.props.onChange.bind(this, "scriptTypes")}
						options={["(empty)", "Anglo-Saxon minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "late Caroline minuscule", "pre-Caroline minuscule"]}
						values={model.scriptTypes} />
				</li>
				<li>
					<label>Script remarks</label>
					<Textarea
						onChange={this.props.onChange.bind(this, "scriptsRemarks")}
						value={model.scriptsRemarks} />
				</li>
				<li className={cx({well: model.annotators.size})}>
					<label>Annotators</label>
					<MultiForm
						attr={"annotators"}
						model={personModel}
						onChange={this.props.onChange}
						onDelete={this.props.onDelete}
						value={model.annotators}
						component={Person} />
				</li>
				<li>
					<label>Typology remarks</label>
					<Input
						onChange={this.props.onChange.bind(this, "typologyRemarks")}
						value={model.typologyRemarks} />
				</li>
				<li>
					<label>Functional aspects</label>
					<Input
						onChange={this.props.onChange.bind(this, "functionalAspects")}
						value={model.functionalAspects} />
				</li>
				<li>
					<label>General observations</label>
					<Textarea
						onChange={this.props.onChange.bind(this, "generalObservations")}
						value={model.generalObservations} />
				</li>
				<li>
					<label>Bibliography</label>
					<MutableList
						editable={true}
						onChange={this.props.onChange.bind(this, "bibliographies")}
						values={model.bibliographies} />
				</li>
			</ul>
		);
	}
}

export default form(MarginUnit);