import React from "react";
import cx from "classnames";

import form from "hire-forms-form";
import MultiForm from "hire-forms-multi-form";
import Input from "hire-forms-input";
import SelectList from "hire-forms-select-list";
import MutableList from "hire-forms-mutable-list";
import Textarea from "hire-forms-textarea";

import DateAndLocalityForm from "../date-and-locality";
import IdentifierForm from "../identifier";
import LocationForm from "../location";
import LayoutForm from "../layout";
import PersonForm from "../person";

import {Tabs, Tab} from "hire-tabs";

class CodexForm extends React.Component {
// let CodexForm = React.createClass({
// 	mixins: [Form],

	// getInitialState() {
	// 	return {
	// 		tab: "Identifiers"
	// 	};
	// },

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		tab: "Identifiers"
	// 	};
	// }

	// handleTabChange(name) {
	// 	this.setState({
	// 		tab: name
	// 	});
	// }

	render() {
		let model = this.props.value;
		console.log(this.props.tab);
		return (
			<Tabs onChange={this.handleTabChange}>
				<Tab
					active={this.props.tab === "identifiers"}
					label="Identifiers">
					<h2>Identifiers</h2>
					<ul className="codex-form">
						<li className={cx({well: model.locations.length})}>
							<label>Codex</label>
							<MultiForm
								{...this.props}
								attr={"locations"}
								model={{
									institute: "",
									pages: "",
									shelfmark: ""
								}}
								values={model.locations}
								component = {LocationForm} />
						</li>
						<li className={cx({well: model.identifiers.length})}>
							<label>Identifier</label>
							<MultiForm
								{...this.props}
								attr={"identifiers"}
								model={{
									identifier: "",
									type: ""
								}}
								values={model.identifiers}
								component = {IdentifierForm} />
						</li>
					</ul>
				</Tab>
				{/*<Tab label="Content summary" active={this.props.tab === "content summary"}>
					<h2>Content summary</h2>
					<ul className="codex-form">
						<li className="well">
							<div>
								<Textarea
									onChange={this.props.onChange.bind(this, "contentSummary")}
									value={model.contentSummary} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Marginal activity" active={this.props.tab === "marginal activity"}>
					<h2>Marginal activity</h2>
					<ul className="codex-form">
						<li className="well small-inputs">
							<label>Quantities</label>
							<ul>
								<li>
									<label>Number of pages</label>
									<Input
										onChange={this.props.onChange.bind(this, "folia")}
										value={model.folia} />
								</li>
								<li>
									<label>Pages with marginalia</label>
									<Input
										onChange={this.props.onChange.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
										value={model["marginalQuantities"].firstPagesWithMarginals} />
									<span>out of (the first)</span>
									<Input
										onChange={this.props.onChange.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
										value={model["marginalQuantities"].firstPagesConsidered} />
									<span>pages</span>
								</li>
								<li>
									<label>Most filled page</label>
									<Input
										onChange={this.props.onChange.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
										value={model["marginalQuantities"].mostFilledPagePctage} />
									<span>% filled:</span>
									<Input
										onChange={this.props.onChange.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
										value={model["marginalQuantities"].mostFilledPageDesignation} />
								</li>
								<li>
									<label>Blank pages</label>
									<Input
										onChange={this.props.onChange.bind(this, ["marginalQuantities", "totalBlankPages"])}
										value={model["marginalQuantities"].totalBlankPages} />
								</li>
							</ul>
						</li>
						<li className="well">
							<label>Summary</label>
							<div>
								<Textarea
									onChange={this.props.onChange.bind(this, "marginalsSummary")}
									value={model.marginalsSummary} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Localisation" active={this.props.tab === "localisation"}>
					<h2>Localisation</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Origin</label>
							<DateAndLocalityForm
								attr={"origin"}
								onChange={this.props.onChange}
								onInvalid={this.props.onInvalid}
								value={model.origin} />
						</li>
						<li className={cx({well: model.provenances.length})}>
							<label>Provenance</label>
							<MultiForm
								{...this.props}
								attr={"provenances"}
								values={model.provenances}
								view = {DateAndLocalityForm} />
						</li>
						<li className="well">
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.props.onChange.bind(this, "dateAndLocaleRemarks")}
									value={model.dateAndLocaleRemarks} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Physical appearance" active={this.props.tab === "physical appearance"}>
					<h2>Physical appearance</h2>
					<ul className="codex-form">
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
									onChange={this.props.onChange.bind(this, "pageDimensionHeight")}
									value={model.pageDimensionHeight} />
								<span>mm</span>
								<span>x</span>
								<Input
									onChange={this.props.onChange.bind(this, "pageDimensionWidth")}
									value={model.pageDimensionWidth} />
								<span>mm</span>
							</div>
						</li>
						<li>
							<label>Quire structure</label>
							<Input
								onChange={this.props.onChange.bind(this, "quireStructure")}
								value={model.quireStructure} />
						</li>
						<li className={cx(
								{"small-inputs": true},
								{well: model.pageLayouts.length}
							)}>
							<label>Layout</label>
							<MultiForm
								{...this.props}
								attr={"pageLayouts"}
								values={model.pageLayouts}
								view = {LayoutForm} />
						</li>
						<li className="well">
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.props.onChange.bind(this, "layoutRemarks")}
									value={model.layoutRemarks} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Script" active={this.props.tab === "script"}>
					<h2>Script</h2>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Type</label>
									<SelectList
										onChange={this.props.onChange.bind(this, ["script", "types"])}
										options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
										values={model["script"].types} />
								</li>
								<li>
									<label>Type remarks</label>
									<Textarea
										onChange={this.props.onChange.bind(this, ["script", "remarks"])}
										value={model["script"].remarks} />
								</li>
								<li>
									<label>Characteristics</label>
									<Input
										onChange={this.props.onChange.bind(this, ["script", "characteristics"])}
										value={model["script"].characteristics} />
								</li>
								<li>
									<label>Number of hands</label>
									<Input
										onChange={this.props.onChange.bind(this, ["script", "handsCount"])}
										value={model["script"].handsCount} />
								</li>
								<li>
									<label>Range</label>
									<Input
										onChange={this.props.onChange.bind(this, ["script", "handsRange"])}
										value={model["script"].handsRange} />
								</li>
								<li className={cx({well: model["script"].scribes.length})}>
									<label>Scribes</label>
									<MultiForm
										attr={["script", "scribes"]}
										onChange={this.props.onChange}
										onDelete={this.props.onDelete}
										values={model.script.scribes}
										view = {PersonForm} />
								</li>
								<li>
									<label>Remarks</label>
									<Textarea
										onChange={this.props.onChange.bind(this, ["script", "scribeRemarks"])}
										value={model.script.scribeRemarks} />
								</li>
							</ul>
						</li>
					</ul>
				</Tab>
				<Tab label="Persons" active={this.props.tab === "persons"}>
					<h2>Persons</h2>
					<ul className="codex-form">
						<li className={cx({well: model.annotators.length})}>
							<label>Annotators</label>
							<MultiForm
								{...this.props}
								attr={"annotators"}
								values={model.annotators}
								view = {PersonForm} />
						</li>
						<li className={cx({well: model.donors.length})}>
							<label>Donors</label>
							<MultiForm
								{...this.props}
								attr={"donors"}
								values={model.donors}
								view = {PersonForm} />
						</li>
						<li className={cx({well: model.patrons.length})}>
							<label>Patrons</label>
							<MultiForm
								{...this.props}
								attr={"patrons"}
								values={model.patrons}
								view = {PersonForm} />
						</li>
					</ul>
				</Tab>
				<Tab label="Bibliography" active={this.props.tab === "bibliography"}>
					<h2>Bibliography</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.props.onChange.bind(this, "bibliographies")}
								values={model.bibliographies} />
						</li>
					</ul>
				</Tab>
				<Tab label="URLs" active={this.props.tab === "urls"}>
					<h2>URLs</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.props.onChange.bind(this, "URLs")}
								values={model.URLs} />
						</li>
					</ul>
				</Tab>*/}
			</Tabs>
		);
	}
}

CodexForm.defaultProps = {
	tab: "identifiers"
}

export default form(CodexForm);