import React from "react";
import cx from "classnames";

import HireForm from "../base";
import MultiForm from "../multi";

// FORM COMPONENTS
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import SelectList from "../../components/select-list";
import MutableList from "../../components/mutable-list";

// FORMS
import Locality from "../locality";
import Person from "../person";

import marginUnit from "../../stores/models/margin-unit";

import {FORM} from "../../constants";

let MarginUnit = React.createClass({
	mixins: [HireForm],

	shouldComponentUpdate(nextProps) {
		return this.props.value !== nextProps.value;
	},

	render() {
		let model = marginUnit.merge(this.props.value);

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
						onChange={this.handleChange.bind(this, "scriptTypes")}
						options={["(empty)", "Anglo-Saxon minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "late Caroline minuscule", "pre-Caroline minuscule"]}
						values={model.get("scriptTypes").toArray()} />
				</li>
				<li>
					<label>Script remarks</label>
					<Textarea
						onChange={this.handleChange.bind(this, "scriptsRemarks")}
						value={model.get("scriptsRemarks")} />
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
					<Textarea
						onChange={this.handleChange.bind(this, "generalObservations")}
						value={model.get("generalObservations")} />
				</li>
				<li>
					<label>Bibliography</label>
					<MutableList
						editable={true}
						onChange={this.handleChange.bind(this, "bibliographies")}
						values={model.get("bibliographies").toArray()} />
				</li>
			</ul>
		);
	}
});

export default MarginUnit;