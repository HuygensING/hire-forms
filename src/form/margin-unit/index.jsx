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
		let model = this.props.value

		return (
			<ul className={FORM}>
				<li>
					<label>Identifier</label>
					<Input
						value={model.get("identifier")}
						onChange={this.handleChange.bind(this, "identifier")} />
				</li>
				<li>
					<label>Pages</label>
					<Input
						value={model.get("pages")}
						onChange={this.handleChange.bind(this, "pages")} />
				</li>
				<li>
					<label>Relative date</label>
					<Input
						value={model.get("relativeDate")}
						onChange={this.handleChange.bind(this, "relativeDate")} />
				</li>
				<li className="well">
					<label>Origin</label>
					<Locality
						attr={"origin"}
						value={model.get("origin")}
						onChange={this.handleChange} />
				</li>
				<li>
					<label>Language</label>
					<SelectList
						values={model.get("languages").toArray()}
						options={["Latin", "Old High German", "none", "Old Irish", "Old Breton", "Old English"]}
						onChange={this.handleChange.bind(this, "languages")} />
				</li>
				<li>
					<label>Script</label>
					<SelectList
						values={model.get("scripts").toArray()}
						options={["(empty)", "Anglo-Saxon minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "late Caroline minuscule", "pre-Caroline minuscule"]}
						onChange={this.handleChange.bind(this, "scripts")} />
				</li>
				<li>
					<label>Script remarks</label>
					<Input
						value={model.get("scriptRemarks")}
						onChange={this.handleChange.bind(this, "scriptRemarks")} />
				</li>
				<li className={cx(well: model.get("annotators").size)}>
					<label>Annotators</label>
					<MultiForm
						attr={"annotators"}
						value={model.get("annotators")}
						view = {Person}
						onChange={this.handleChange}
						onDelete={this.handleDelete} />
				</li>
				<li>
					<label>Typology remarks</label>
					<Input
						value={model.get("typologyRemarks")}
						onChange={this.handleChange.bind(this, "typologyRemarks")} />
				</li>
				<li>
					<label>Functional aspects</label>
					<Input
						value={model.get("functionalAspects")}
						onChange={this.handleChange.bind(this, "functionalAspects")} />
				</li>
				<li>
					<label>General observations</label>
					<Input
						value={model.get("generalObservations")}
						onChange={this.handleChange.bind(this, "generalObservations")} />
				</li>
				<li>
					<label>Bibliography</label>
					<MutableList
						editable={true}
						values={model.get("bibliography").toArray()}
						onChange={this.handleChange.bind(this, "bibliography")} />
				</li>
			</ul>
		)
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
}

export default MarginUnit;