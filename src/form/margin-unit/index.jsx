import React from "react";
import Immutable from "immutable";
import cx from "classnames";

import Form from "../base";
import MultiForm from "../multi";

// FORM COMPONENTS
import Input from "../../components/input";
import SelectList from "../../components/select-list";
import MutableList from "../../components/mutable-list";

// FORMS
import Locality from "../locality";
import Person from "../person";

import {FORM} from "../../constants";

class MarginUnit extends Form {
	render() {
		let model = this.props.value;

		return (
			<ul className={FORM}>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.handleChange.bind(this, "identifier")}
						value={model.get("identifier")} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						onChange={this.handleChange.bind(this, "pages")}
						value={model.get("pages")} />
				</li>
				<li>
					<label>Relative date</label>
					<Input
						onChange={this.handleChange.bind(this, "relativeDate")}
						value={model.get("relativeDate")} />
				</li>
				<li className="well">
					<label>Origin</label>
					<Locality
						attr={"origin"}
						onChange={this.handleChange}
						value={model.get("origin")} />
				</li>
				<li>
					<label>Language</label>
					<SelectList
						onChange={this.handleChange.bind(this, "languages")}
						options={["Latin", "Old High German", "none", "Old Irish", "Old Breton", "Old English"]}
						values={model.get("languages").toArray()} />
				</li>
				<li>
					<label>Script</label>
					<SelectList
						onChange={this.handleChange.bind(this, "scripts")}
						options={["(empty)", "Anglo-Saxon minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "late Caroline minuscule", "pre-Caroline minuscule"]}
						values={model.get("scripts").toArray()} />
				</li>
				<li>
					<label>Script remarks</label>
					<Input
						onChange={this.handleChange.bind(this, "scriptRemarks")}
						value={model.get("scriptRemarks")} />
				</li>
				<li className={cx({well: model.get("annotators").size})}>
					<label>Annotators</label>
					<MultiForm
						attr={"annotators"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("annotators")}
						view = {Person} />
				</li>
				<li>
					<label>Typology remarks</label>
					<Input
						onChange={this.handleChange.bind(this, "typologyRemarks")}
						value={model.get("typologyRemarks")} />
				</li>
				<li>
					<label>Functional aspects</label>
					<Input
						onChange={this.handleChange.bind(this, "functionalAspects")}
						value={model.get("functionalAspects")} />
				</li>
				<li>
					<label>General observations</label>
					<Input
						onChange={this.handleChange.bind(this, "generalObservations")}
						value={model.get("generalObservations")} />
				</li>
				<li>
					<label>Bibliography</label>
					<MutableList
						editable={true}
						onChange={this.handleChange.bind(this, "bibliography")}
						values={model.get("bibliography").toArray()} />
				</li>
			</ul>
		);
	}
}

MarginUnit.defaultFormProps = {
	annotationTypes: new Immutable.List(),
	annotators: new Immutable.List(),
	bibliography: new Immutable.List(),
	date: "",
	identifier: "",
	functionalAspects: "",
	generalObservations: "",
	languages: new Immutable.List(),
	origin: new Immutable.Map(),
	pages: "",
	relativeDate: "",
	scripts: new Immutable.List(),
	specificPhenomena: new Immutable.List(),
	typologyRemarks: ""
};

MarginUnit.propTypes = {
	value: React.PropTypes.instanceOf(Immutable.Map)
};

export default MarginUnit;