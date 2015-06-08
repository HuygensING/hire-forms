import React from "react";
import cx from "classnames";

import Input from "../components/input";
import Select from "../components/select";
import SelectList from "../components/select-list";
import MutableList from "../components/mutable-list";
import Textarea from "../components/textarea";

import LocalityForm from "./locality";
import IdentifierForm from "./identifier";
import LocationForm from "./location";
import LayoutForm from "./layout";
import PersonForm from "./person";

import HireForm from "./base";
import MultiForm from "./multi";

import {Tabs, Tab} from "../components/tabs";

import {FORM} from "../constants";

let CodexForm = React.createClass({
	mixins: [HireForm],

	getInitialState() {
		return {
			tab: "Identifiers"
		};
	},

	handleTabChange(name) {
		this.setState({
			tab: name
		});
	},

	render() {
		let model = this.props.value;

		console.log(this.state);

		return (
			<Tabs onChange={this.handleTabChange}>
				<Tab label="Identifiers" active={this.state.tab === "Identifiers"}>
					<h2>Identifiers</h2>
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
					</ul>
				</Tab>
				<Tab label="Content summary" active={this.state.tab === "Content summary"}>
					<h2>Content summary</h2>
					<ul className={"codex-form " + FORM}>
						<li className="well">
							<div>
								<Textarea
									onChange={this.handleChange.bind(this, "contentSummary")}
									value={model.get("contentSummary")} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Marginal activity" active={this.state.tab === "Marginal activity"}>
					<h2>Marginal activity</h2>
					<ul className={"codex-form " + FORM}>
						<li className="well small-inputs">
							<label>Quantities</label>
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
										onChange={this.handleChange.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
										value={model.getIn(["marginalQuantities", "firstPagesWithMarginals"])} />
									<span>out of (the first)</span>
									<Input
										onChange={this.handleChange.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
										value={model.getIn(["marginalQuantities", "firstPagesConsidered"])} />
									<span>pages</span>
								</li>
								<li>
									<label>Most filled page</label>
									<Input
										onChange={this.handleChange.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
										value={model.getIn(["marginalQuantities", "mostFilledPagePctage"])} />
									<span>% filled:</span>
									<Input
										onChange={this.handleChange.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
										value={model.getIn(["marginalQuantities", "mostFilledPageDesignation"])} />
								</li>
								<li>
									<label>Blank pages</label>
									<Input
										onChange={this.handleChange.bind(this, ["marginalQuantities", "totalBlankPages"])}
										value={model.getIn(["marginalQuantities", "totalBlankPages"])} />
								</li>
							</ul>
						</li>
						<li className="well">
							<label>Summary</label>
							<div>
								<Textarea
									onChange={this.handleChange.bind(this, "marginalsSummary")}
									value={model.get("marginalsSummary")} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Localisation" active={this.state.tab === "Localisation"}>
					<h2>Localisation</h2>
					<ul className={"codex-form " + FORM}>
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
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.handleChange.bind(this, "dateAndLocaleRemarks")}
									value={model.get("dateAndLocaleRemarks")} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Physical appearance" active={this.state.tab === "Physical appearance"}>
					<h2>Physical appearance</h2>
					<ul className={"codex-form " + FORM}>
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
									onChange={this.handleChange.bind(this, "pageDimensionHeight")}
									value={model.get("pageDimensionHeight")} />
								<span>mm</span>
								<span>x</span>
								<Input
									onChange={this.handleChange.bind(this, "pageDimensionWidth")}
									value={model.get("pageDimensionWidth")} />
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
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.handleChange.bind(this, "layoutRemarks")}
									value={model.get("layoutRemarks")} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Script" active={this.state.tab === "Script"}>
					<h2>Script</h2>
					<ul className={"codex-form " + FORM}>
						<li className="well">
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
					</ul>
				</Tab>
				<Tab label="Persons" active={this.state.tab === "Persons"}>
					<h2>Persons</h2>
					<ul className={"codex-form " + FORM}>
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
					</ul>
				</Tab>
				<Tab label="Bibliography" active={this.state.tab === "Bibliography"}>
					<h2>Bibliography</h2>
					<ul className={"codex-form " + FORM}>
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.handleChange.bind(this, "bibliographies")}
								values={model.get("bibliographies").toArray()} />
						</li>
					</ul>
				</Tab>
				<Tab label="URLs" active={this.state.tab === "URLs"}>
					<h2>URLs</h2>
					<ul className={"codex-form " + FORM}>
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.handleChange.bind(this, "URLs")}
								values={model.get("URLs").toArray()} />
						</li>
					</ul>
				</Tab>
			</Tabs>
		);
	}
});

export default CodexForm;