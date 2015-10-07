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

import {
	personModel,
	layoutModel,
	dateAndLocalityModel,
	identifierModel,
	locationModel
} from "../../../../models";

class CodexForm extends React.Component {
	handleTabChange(subtab) {
		let codex = this.props.codices.current;
		subtab = subtab.toLowerCase().replace(" ", "-");
		let path = `/codex/${codex.pid}/edit/${this.props.params.tab}/${subtab}`;

		this.props.history.pushState(null, path);
	}

	render() {
		let model = this.props.value;

		let tab = (this.props.params.subtab != null) ?
			this.props.params.subtab :
			"identifiers";

		return (
			<Tabs onChange={this.handleTabChange.bind(this)}>
				<Tab
					active={tab === "identifiers"}
					label="Identifiers">
					<h2>Identifiers</h2>
					<ul className="codex-form">
						<li className={cx({well: model.locations.length})}>
							<label>Codex</label>
							<MultiForm
								attr={"locations"}
								model={locationModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.locations}
								component={LocationForm} />
						</li>
						<li className={cx({well: model.identifiers.length})}>
							<label>Identifier</label>
							<MultiForm
								attr={"identifiers"}
								model={identifierModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.identifiers}
								component={IdentifierForm} />
						</li>
					</ul>
				</Tab>
				<Tab label="Content summary" active={tab === "content-summary"}>
					<h2>Content summary</h2>
					<ul className="codex-form">
						<li className="well">
							<div>
								<Textarea
									onChange={this.props.onFormChangeKey.bind(this, "contentSummary")}
									value={model.contentSummary} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Marginal activity" active={tab === "marginal-activity"}>
					<h2>Marginal activity</h2>
					<ul className="codex-form">
						<li className="well small-inputs">
							<label>Quantities</label>
							<ul>
								<li>
									<label>Number of pages</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, "folia")}
										value={model.folia} />
								</li>
								<li>
									<label>Pages with marginalia</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
										value={model["marginalQuantities"].firstPagesWithMarginals} />
									<span>out of (the first)</span>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
										value={model["marginalQuantities"].firstPagesConsidered} />
									<span>pages</span>
								</li>
								<li>
									<label>Most filled page</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
										value={model["marginalQuantities"].mostFilledPagePctage} />
									<span>% filled:</span>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
										value={model["marginalQuantities"].mostFilledPageDesignation} />
								</li>
								<li>
									<label>Blank pages</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "totalBlankPages"])}
										value={model["marginalQuantities"].totalBlankPages} />
								</li>
							</ul>
						</li>
						<li className="well">
							<label>Summary</label>
							<div>
								<Textarea
									onChange={this.props.onFormChangeKey.bind(this, "marginalsSummary")}
									value={model.marginalsSummary} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Localisation" active={tab === "localisation"}>
					<h2>Localisation</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Origin</label>
							<DateAndLocalityForm
								attr={"origin"}
								onChange={this.props.onFormChangeKey}
								onInvalid={this.props.onFormInvalid}
								formData={model.origin} />
						</li>
						<li className={cx({well: model.provenances.length})}>
							<label>Provenance</label>
							<MultiForm
								attr={"provenances"}
								model={dateAndLocalityModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								onInvalid={this.props.onFormInvalid}
								values={model.provenances}
								component={DateAndLocalityForm} />
						</li>
						<li className="well">
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.props.onFormChangeKey.bind(this, "dateAndLocaleRemarks")}
									value={model.dateAndLocaleRemarks} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Physical appearance" active={tab === "physical-appearance"}>
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
									onChange={this.props.onFormChangeKey.bind(this, "pageDimensionHeight")}
									value={model.pageDimensionHeight} />
								<span>mm</span>
								<span>x</span>
								<Input
									onChange={this.props.onFormChangeKey.bind(this, "pageDimensionWidth")}
									value={model.pageDimensionWidth} />
								<span>mm</span>
							</div>
						</li>
						<li>
							<label>Quire structure</label>
							<Input
								onChange={this.props.onFormChangeKey.bind(this, "quireStructure")}
								value={model.quireStructure} />
						</li>
						<li className={cx(
								{"small-inputs": true},
								{well: model.pageLayouts.length}
							)}>
							<label>Layout</label>
							<MultiForm
								attr={"pageLayouts"}
								model={layoutModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.pageLayouts}
								component={LayoutForm} />
						</li>
						<li className="well">
							<label>Remarks</label>
							<div>
								<Textarea
									onChange={this.props.onFormChangeKey.bind(this, "layoutRemarks")}
									value={model.layoutRemarks} />
							</div>
						</li>
					</ul>
				</Tab>
				<Tab label="Script" active={tab === "script"}>
					<h2>Script</h2>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Type</label>
									<SelectList
										onChange={this.props.onFormChangeKey.bind(this, ["script", "types"])}
										options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
										values={model["script"].types} />
								</li>
								<li>
									<label>Type remarks</label>
									<Textarea
										onChange={this.props.onFormChangeKey.bind(this, ["script", "remarks"])}
										value={model["script"].remarks} />
								</li>
								<li>
									<label>Characteristics</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["script", "characteristics"])}
										value={model["script"].characteristics} />
								</li>
								<li>
									<label>Number of hands</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["script", "handsCount"])}
										value={model["script"].handsCount} />
								</li>
								<li>
									<label>Range</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["script", "handsRange"])}
										value={model["script"].handsRange} />
								</li>
								<li className={cx({well: model["script"].scribes.length})}>
									<label>Scribes</label>
									<MultiForm
										{...this.props}
										attr={["script", "scribes"]}
										model={personModel}
										onChange={this.props.onFormChangeKey}
										onDelete={this.props.onFormDeleteKey}
										values={model.script.scribes}
										component={PersonForm} />
								</li>
								<li>
									<label>Remarks</label>
									<Textarea
										onChange={this.props.onFormChangeKey.bind(this, ["script", "scribeRemarks"])}
										value={model.script.scribeRemarks} />
								</li>
							</ul>
						</li>
					</ul>
				</Tab>
				<Tab label="Persons" active={tab === "persons"}>
					<h2>Persons</h2>
					<ul className="codex-form">
						<li className={cx({well: model.annotators.length})}>
							<label>Annotators</label>
							<MultiForm
								attr={"annotators"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.annotators}
								component={PersonForm} />
						</li>
						<li className={cx({well: model.donors.length})}>
							<label>Donors</label>
							<MultiForm
								attr={"donors"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.donors}
								component={PersonForm} />
						</li>
						<li className={cx({well: model.patrons.length})}>
							<label>Patrons</label>
							<MultiForm
								attr={"patrons"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.patrons}
								component={PersonForm} />
						</li>
					</ul>
				</Tab>
				<Tab label="Bibliography" active={tab === "bibliography"}>
					<h2>Bibliography</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.props.onFormChangeKey.bind(this, "bibliographies")}
								values={model.bibliographies} />
						</li>
					</ul>
				</Tab>
				<Tab label="URLs" active={tab === "urls"}>
					<h2>URLs</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable={true}
								onChange={this.props.onFormChangeKey.bind(this, "URLs")}
								values={model.URLs} />
						</li>
					</ul>
				</Tab>
			</Tabs>
		);
	}
}

CodexForm.defaultProps = {

}

export default form(CodexForm);