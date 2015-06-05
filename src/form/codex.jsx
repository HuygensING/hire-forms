import React from "react";
import Immutable from "immutable";

import cx from "classnames";

import Input from "../components/input";
import Select from "../components/select";
import SelectList from "../components/select-list";
import MutableList from "../components/mutable-list";
import Textarea from "../components/textarea";
import MultiSelect from "../components/multi-select";

import LocalityForm from "./locality";
import IdentifierForm from "./identifier";
import LocationForm from "./location";
import LayoutForm from "./layout";
import PersonForm from "./person";

import HireForm from "./base";
import MultiForm from "./multi";

import {FORM} from "../constants";

let CodexForm = React.createClass({
	// propTypes: {
	// 	value: React.PropTypes.instanceOf(Immutable.Map).isRequired,
	// 	onChange: React.PropTypes.func.isRequired,
	// 	onDelete: React.PropTypes.func.isRequired
	// },

	mixins: [HireForm],

	// handleChange(key, value) {
	// 	this.props.onChange(key, value);
	// }

	// handleDelete(key) {
	// 	this.props.onDelete(key);
	// }

	render() {
		let model = this.props.value;

		return (
			<ul className={"codex-form " + FORM}>
				<li className={cx({well: model.get("locations").size})}>
					<label>Codex</label>
					<MultiForm
						attr={"locations"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("locations")}
						view = {LocationForm} />
				</li>
				<li className={cx({well: model.get("identifiers").size})}>
					<label>Identifier</label>
					<MultiForm
						attr={"identifiers"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("identifiers")}
						view = {IdentifierForm} />
				</li>
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
				<li className="well">
					<label>Content summary</label>
					<div>
						<Textarea
							onChange={this.handleChange.bind(this, "contentSummary")}
							value={model.get("contentSummary")} />
					</div>
				</li>
				<li className="well">
					<label>Marginal activity summary</label>
					<div>
						<Textarea
							onChange={this.handleChange.bind(this, "marginalsSummary")}
							value={model.get("marginalsSummary")} />
					</div>
				</li>
				<li className="well small-inputs">
					<label>Quantities marginal activity</label>
					<ul>
						<li>
							<label>Number of pages</label>
							<Input
								onChange={this.handleChange.bind(this, "folia")}
								value={model.get("folia")} />
						</li>
						<li>
							<label>Pages with marginalia</label>
							<Input
								onChange={this.handleChange.bind(this, "firstPagesWithMarginals")}
								value={model.get("firstPagesWithMarginals")} />
							<span>out of (the first)</span>
							<Input
								onChange={this.handleChange.bind(this, "firstPagesConsidered")}
								value={model.get("firstPagesConsidered")} />
							<span>pages</span>
						</li>
						<li>
							<label>Most filled page</label>
							<Input
								onChange={this.handleChange.bind(this, "mostFilledPagePctage")}
								value={model.get("mostFilledPagePctage")} />
							<span>% filled:</span>
							<Input
								onChange={this.handleChange.bind(this, "mostFilledPageDesignation")}
								value={model.get("mostFilledPageDesignation")} />
						</li>
						<li>
							<label>Blank pages</label>
							<Input
								onChange={this.handleChange.bind(this, "totalBlankPages")}
								value={model.get("totalBlankPages")} />
						</li>
					</ul>
				</li>
				<li className="well">
					<label>Origin</label>
					<LocalityForm
						attr={"origin"}
						onChange={this.handleChange}
						value={model.get("origin")} />
				</li>
				<li className={cx({well: model.get("provenances").size})}>
					<label>Provenance</label>
					<MultiForm
						attr={"provenances"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("provenances")}
						view = {LocalityForm} />
				</li>
				<li className="well">
					<label>Remarks date & loc</label>
					<div>
						<Textarea
							onChange={this.handleChange.bind(this, "dateAndLocaleRemarks")}
							value={model.get("dateAndLocaleRemarks")} />
					</div>
				</li>
				<li className="well small-inputs">
					<label>Page dimensions</label>
					<div>
						<label>
							<span>Width</span>
							<span>x</span>
							<span>height</span>
							<span>=</span>
						</label>
						<Input
							onChange={this.handleChange.bind(this, "pageDimension_height")}
							value={model.get("pageDimension_height")} />
						<span>mm</span>
						<span>x</span>
						<Input
							onChange={this.handleChange.bind(this, "pageDimension_width")}
							value={model.get("pageDimension_width")} />
						<span>mm</span>
					</div>
				</li>
				<li>
					<label>Quire structure</label>
					<Input
						onChange={this.handleChange.bind(this, "quireStructure")}
						value={model.get("quireStructure")} />
				</li>
				<li className={cx(
						{"small-inputs": true},
						{well: model.get("pageLayouts").size}
					)}>
					<label>Layout</label>
					<MultiForm
						attr={"pageLayouts"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("pageLayouts")}
						view = {LayoutForm} />
				</li>
				<li className="well">
					<label>Layout remarks</label>
					<div>
						<Textarea
							onChange={this.handleChange.bind(this, "layoutRemarks")}
							value={model.get("layoutRemarks")} />
					</div>
				</li>
				<li className="well">
					<label>Script</label>
					<ul className={FORM}>
						<li>
							<label>Type</label>
							<SelectList
								onChange={this.handleChange.bind(this, ["script", "types"])}
								options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
								values={model.getIn(["script", "types"]).toArray()} />
						</li>
						<li>
							<label>Type remarks</label>
							<Textarea
								onChange={this.handleChange.bind(this, ["script", "remarks"])}
								value={model.getIn(["script", "remarks"])} />
						</li>
						<li>
							<label>Characteristics</label>
							<Input
								onChange={this.handleChange.bind(this, ["script", "characteristics"])}
								value={model.getIn(["script", "characteristics"])} />
						</li>
						<li>
							<label>Number of hands</label>
							<Input
								onChange={this.handleChange.bind(this, ["script", "handsCount"])}
								value={model.getIn(["script", "handsCount"])} />
						</li>
						<li>
							<label>Range</label>
							<Input
								onChange={this.handleChange.bind(this, ["script", "handsRange"])}
								value={model.getIn(["script", "handsRange"])} />
						</li>
						<li className={cx({well: model.getIn(["script", "scribes"]).size})}>
							<label>Scribes</label>
							<MultiForm
								attr={["script", "scribes"]}
								onChange={this.handleChange}
								onDelete={this.handleDelete}
								value={model.getIn(["script", "scribes"])}
								view = {PersonForm} />
						</li>
						<li>
							<label>Remarks</label>
							<Textarea
								onChange={this.handleChange.bind(this, ["script", "scribeRemarks"])}
								value={model.getIn(["script", "scribeRemarks"])} />
						</li>
					</ul>
				</li>
				<li className={cx({well: model.get("annotators").size})}>
					<label>Annotators</label>
					<MultiForm
						attr={"annotators"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("annotators")}
						view = {PersonForm} />
				</li>
				<li className={cx({well: model.get("donors").size})}>
					<label>Donors</label>
					<MultiForm
						attr={"donors"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("donors")}
						view = {PersonForm} />
				</li>
				<li className={cx({well: model.get("patrons").size})}>
					<label>Patrons</label>
					<MultiForm
						attr={"patrons"}
						onChange={this.handleChange}
						onDelete={this.handleDelete}
						value={model.get("patrons")}
						view = {PersonForm} />
				</li>
				<li className="well">
					<label>Bibliography</label>
					<MutableList
						editable={true}
						onChange={this.handleChange.bind(this, "bibliographies")}
						values={model.get("bibliographies").toArray()} />
				</li>
				<li className="well">
					<label>URLs</label>
					<MutableList
						editable={true}
						onChange={this.handleChange.bind(this, "URLs")}
						values={model.get("URLs").toArray()} />
				</li>
			</ul>
		);
	}
});

export default CodexForm;