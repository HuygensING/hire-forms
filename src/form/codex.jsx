import React from "react";
import Immutable from "immutable";

import cx from "classnames";

import Input from "../components/input";
import Select from "../components/select";
import SelectList from "../components/select-list";
import Checkbox from "../components/checkbox";
import Autocomplete from "../components/autocomplete";
import MutableList from "../components/mutable-list";
import Textarea from "../components/textarea";
import MultiSelect from "../components/multi-select";
import Label from "../components/label";
import // Locality from "../custom-components/locality";

Forms =
	Locality: require "./locality"
	Identifier: require "./identifier"
	Location: require "./location"
	Layout: require "./layout"
	Person: require "./person"

import MultiForm from "./multi";

import {FORM} from "../constants";

class CodexForm extends React.Component
	this.propTypes =
		model: React.PropTypes.instanceOf(Immutable.Map).isRequired
		onChange: React.PropTypes.func.isRequired
		onDelete: React.PropTypes.func.isRequired

	render() {
		model = this.props.model

		<ul className={"codex-form "+FORM}>
			<li className={cx(well: model.get("locations").size)}>
				<label>Codex</label>
				<MultiForm
					attr={"locations"}
					value={model.get("locations")}
					view = {Forms.Location}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className={cx(well: model.get("identifiers").size)}>
				<label>Identifier</label>
				<MultiForm
					attr={"identifiers"}
					value={model.get("identifiers")}
					view = {Forms.Identifier}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className="well">
				<label>Examined</label>
				<div>
					<Select
						value={model.get("examined")}
						options={[
							key: "Catalogue only",
							value: "Catalogue only"
						,
							key: "Digital only",
							value: "Digital only"
						,
							key: "In person"
							value: "In person"
						]}
						onChange={this.handleChange.bind(this, "examined")} />
				</div>
			</li>
			<li className="well">
				<label>Interesting for</label>
				<MultiSelect
					values={model.get("interestingFor").toArray()}
					options={["Evina", "Irene", "Mariken"]}
					onChange={this.handleChange.bind(this, "interestingFor")} />
			</li>
			<li className="well">
				<label>Private remarks</label>
				<div>
					<Textarea
						value={model.get("userRemarks")}
						onChange={this.handleChange.bind(this, "userRemarks")} />
				</div>
			</li>
			<li className="well">
				<label>Content summary</label>
				<div>
					<Textarea
						value={model.get("contentSummary")}
						onChange={this.handleChange.bind(this, "contentSummary")} />
				</div>
			</li>
			<li className="well">
				<label>Marginal activity summary</label>
				<div>
					<Textarea
						value={model.get("marginalsSummary")}
						onChange={this.handleChange.bind(this, "marginalsSummary")} />
				</div>
			</li>
			<li className="well small-inputs">
				<label>Quantities marginal activity</label>
				<ul>
					<li>
						<label>Number of pages</label>
						<Input
							value={model.get("folia")}
							onChange={this.handleChange.bind(this, "folia")} />
					</li>
					<li>
						<label>Pages with marginalia</label>
						<Input
							value={model.get("firstPagesWithMarginals")}
							onChange={this.handleChange.bind(this, "firstPagesWithMarginals")} />
						<span>out of (the first)</span>
						<Input
							value={model.get("firstPagesConsidered")}
							onChange={this.handleChange.bind(this, "firstPagesConsidered")} />
						<span>pages</span>
					</li>
					<li>
						<label>Most filled page</label>
						<Input
							value={model.get("mostFilledPagePctage")}
							onChange={this.handleChange.bind(this, "mostFilledPagePctage")} />
						<span>% filled:</span>
						<Input
							value={model.get("mostFilledPageDesignation")}
							onChange={this.handleChange.bind(this, "mostFilledPageDesignation")} />
					</li>
					<li>
						<label>Blank pages</label>
						<Input
							value={model.get("totalBlankPages")}
							onChange={this.handleChange.bind(this, "totalBlankPages")} />
					</li>
				</ul>
			</li>
			<li className="well">
				<label>Origin</label>
				<Forms.Locality
					attr={"origin"}
					value={model.get("origin")}
					onChange={this.handleChange} />
			</li>
			<li className={cx(well: model.get("provenances").size)}>
				<label>Provenance</label>
				<MultiForm
					attr={"provenances"}
					value={model.get("provenances")}
					view = {Forms.Locality}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className="well">
				<label>Remarks date & loc</label>
				<div>
					<Textarea
						value={model.get("dateAndLocaleRemarks")}
						onChange={this.handleChange.bind(this, "dateAndLocaleRemarks")} />
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
						value={model.get("pageDimension_height")}
						onChange={this.handleChange.bind(this, "pageDimension_height")} />
					<span>mm</span>
					<span>x</span>
					<Input
						value={model.get("pageDimension_width")}
						onChange={this.handleChange.bind(this, "pageDimension_width")} />
					<span>mm</span>
				</div>
			</li>
			<li>
				<label>Quire structure</label>
				<Input
					value={model.get("quireStructure")}
					onChange={this.handleChange.bind(this, "quireStructure")} />
			</li>
			<li className={cx(
					"small-inputs": true
					well: model.get("pageLayouts").size
				)}>
				<label>Layout</label>
				<MultiForm
					attr={"pageLayouts"}
					value={model.get("pageLayouts")}
					view = {Forms.Layout}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className="well">
				<label>Layout remarks</label>
				<div>
					<Textarea
						value={model.get("layoutRemarks")}
						onChange={this.handleChange.bind(this, "layoutRemarks")} />
				</div>
			</li>
			<li className="well">
				<label>Script</label>
				<ul className={FORM}>
					<li>
						<label>Type</label>
						<SelectList
							values={model.getIn(["script", "types"]).toArray()}
							options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
							onChange={this.handleChange.bind(this, ["script", "types"])} />
					</li>
					<li>
						<label>Type remarks</label>
						<Textarea
							value={model.getIn(["script", "remarks"])}
							onChange={this.handleChange.bind(this, ["script", "remarks"])} />
					</li>
					<li>
						<label>Characteristics</label>
						<Input
							value={model.getIn(["script", "characteristics"])}
							onChange={this.handleChange.bind(this, ["script", "characteristics"])} />
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							value={model.getIn(["script", "handsCount"])}
							onChange={this.handleChange.bind(this, ["script", "handsCount"])} />
					</li>
					<li>
						<label>Range</label>
						<Input
							value={model.getIn(["script", "handsRange"])}
							onChange={this.handleChange.bind(this, ["script", "handsRange"])} />
					</li>
					<li className={cx(well: model.getIn(["script", "scribes"]).size)}>
						<label>Scribes</label>
						<MultiForm
							attr={["script", "scribes"]}
							value={model.getIn(["script", "scribes"])}
							view = {Forms.Person}
							onChange={this.handleChange}
							onDelete={this.handleDelete} />
					</li>
					<li>
						<label>Remarks</label>
						<Textarea
							value={model.getIn(["script", "scribeRemarks"])}
							onChange={this.handleChange.bind(this, ["script", "scribeRemarks"])} />
					</li>
				</ul>
			</li>
			<li className={cx(well: model.get("annotators").size)}>
				<label>Annotators</label>
				<MultiForm
					attr={"annotators"}
					value={model.get("annotators")}
					view = {Forms.Person}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className={cx(well: model.get("donors").size)}>
				<label>Donors</label>
				<MultiForm
					attr={"donors"}
					value={model.get("donors")}
					view = {Forms.Person}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className={cx(well: model.get("patrons").size)}>
				<label>Patrons</label>
				<MultiForm
					attr={"patrons"}
					value={model.get("patrons")}
					view = {Forms.Person}
					onChange={this.handleChange}
					onDelete={this.handleDelete} />
			</li>
			<li className="well">
				<label>Bibliography</label>
				<MutableList
					editable={true}
					values={model.get("bibliographies").toArray()}
					onChange={this.handleChange.bind(this, "bibliographies")} />
			</li>
			<li className="well">
				<label>URLs</label>
				<MutableList
					editable={true}
					values={model.get("URLs").toArray()}
					onChange={this.handleChange.bind(this, "URLs")} />
			</li>
		</ul>

	handleChange: (key, value) =>
		this.props.onChange key, value

	handleDelete: (key) =>
		this.props.onDelete key

}

export default CodexForm;