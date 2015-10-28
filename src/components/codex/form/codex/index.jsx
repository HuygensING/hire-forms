import React from "react";
import cx from "classnames";

import form from "hire-forms-form";
import MultiForm from "hire-forms-multi-form";
import Input from "hire-forms-input";
import SelectList from "hire-forms-select-list";
import MutableList from "hire-forms-mutable-list";
import Textarea from "hire-forms-textarea";
import LiTextarea from "../elements/li-textarea";

import IdentifiersForm from "./identifiers";

import DateAndLocalityForm from "../date-and-locality";


import LayoutForm from "../layout";
import PersonForm from "../person";

import {Tabs, Tab} from "hire-tabs";

import {
	personModel,
	layoutModel,
	dateAndLocalityModel
} from "../../../../models";

class CodexForm extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.tab == null && nextProps.codices.current.pid !== "") {
			let codex = nextProps.codices.current;
			let path = `/codex/${codex.pid}/edit/codex`;

			this.props.history.pushState(null, path);
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		let valueChanged = this.props.value !== nextProps.value;
		let paramsChanged = this.props.params !== nextProps.params;
		return valueChanged || paramsChanged;
	}

	handleTabChange(subtab) {
		let codex = this.props.codices.current;
		subtab = subtab.toLowerCase().replace(" ", "-");

		let pid = (codex.pid === "") ?
			codex.pid :
			`/${codex.pid}`;

		let tab = this.props.params.tab == null ?
			"codex" :
			this.props.params.tab;

		let path = `/codex${pid}/edit/${tab}/${subtab}`;

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
					<IdentifiersForm {...this.props}/>
				</Tab>
				<Tab label="Content summary" active={tab === "content-summary"}>
					<ul className="codex-form">
						<LiTextarea
							label="Content summary"
							onChange={this.props.onFormChangeKey.bind(this, "contentSummary")}
							value={model.contentSummary}/>
					</ul>
				</Tab>
				<Tab label="Marginal activity" active={tab === "marginal-activity"}>
					<h2>Marginal activity</h2>
					<ul className="codex-form">
						<li className="well small-inputs marginal-activity">
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
						<LiTextarea
							label="Summary"
							onChange={this.props.onFormChangeKey.bind(this, "marginalsSummary")}
							value={model.marginalsSummary}/>
					</ul>
				</Tab>
				<Tab label="Date" active={tab === "date"}>
					<h2>Date</h2>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Date</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, "date")}
										value={model.date} />
								</li>
								<li>
									<label>Source</label>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, "dateSource")}
										value={model.dateSource} />
								</li>
							</ul>
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
								formData={model.origin}
								onChange={this.props.onFormChangeKey}
								onInvalid={this.props.onFormInvalid}
								showDate={false} />
						</li>
						<li className="well">
							<label>Provenance</label>
							<MultiForm
								addButtonValue="+"
								attr={"provenances"}
								component={DateAndLocalityForm}
								model={dateAndLocalityModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								onInvalid={this.props.onFormInvalid}
								values={model.provenances} />
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.onFormChangeKey.bind(this, "dateAndLocaleRemarks")}
							value={model.dateAndLocaleRemarks}/>
					</ul>
				</Tab>
				<Tab label="Physical appearance" active={tab === "physical-appearance"}>
					<h2>Physical appearance</h2>
					<ul className="codex-form">
						<li className="well small-inputs page-dimensions">
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
						<LiTextarea
							label="Quire structure"
							onChange={this.props.onFormChangeKey.bind(this, "quireStructure")}
							value={model.quireStructure}/>
						<li className="well small-inputs">
							<label>Layout</label>
							<MultiForm
								addButtonValue="+"
								attr="pageLayouts"
								model={layoutModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.pageLayouts}
								component={LayoutForm} />
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.onFormChangeKey.bind(this, "layoutRemarks")}
							value={model.layoutRemarks} />
					</ul>
				</Tab>
				<Tab label="Script" active={tab === "script"}>
					<h2>Script</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Type</label>
							<SelectList
								onChange={this.props.onFormChangeKey.bind(this, ["script", "types"])}
								options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
								values={model["script"].types} />
						</li>
					</ul>
					<ul className="codex-form">
						<LiTextarea
							label="Type remarks"
							onChange={this.props.onFormChangeKey.bind(this, ["script", "remarks"])}
							value={model["script"].remarks}/>
					</ul>
					<ul className="codex-form">
						<li className="well">
							<ul>
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
							</ul>
						</li>
					</ul>
					<ul className="codex-form">
						<li className="well">
							<label>Scribes</label>
							<MultiForm
								{...this.props}
								addButtonValue="+"
								attr={["script", "scribes"]}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.script.scribes}
								component={PersonForm} />
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.onFormChangeKey.bind(this, ["script", "scribeRemarks"])}
							value={model.script.scribeRemarks}/>
					</ul>
				</Tab>
				<Tab label="Persons" active={tab === "persons"}>
					<h2>Persons</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Annotators</label>
							<MultiForm
								addButtonValue="+"
								attr={"annotators"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
								values={model.annotators}
								component={PersonForm} />
						</li>
						<li className="well">
							<label>Donors</label>
							<MultiForm
								addButtonValue="+"
								attr={"donors"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
								values={model.donors}
								component={PersonForm} />
						</li>
						<li className="well">
							<label>Patrons</label>
							<MultiForm
								addButtonValue="+"
								attr={"patrons"}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
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