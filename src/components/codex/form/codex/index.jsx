import React from "react";
import {browserHistory} from "react-router";
import cx from "classnames";
import form from "hire-forms-form";
import MultiForm from "hire-forms-multi-form";
import Input from "hire-forms-input";
import SelectList from "hire-forms-select-list";
import MutableList from "hire-forms-mutable-list";
import Textarea from "hire-forms-textarea";
import LiTextarea from "../elements/li-textarea";
import GeneralInformationForm from "./general-information";
import DateAndLocalityForm from "../elements/date-and-locality";
import LayoutForm from "../elements/layout";
import PersonForm from "../elements/person";
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

			browserHistory.replace(path);
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		let valueChanged = this.props.value !== nextProps.value;
		let paramsChanged = this.props.params !== nextProps.params;
		return valueChanged || paramsChanged;
	}

	handleTabChange(subtab) {
		const codex = this.props.codices.current;
		const pid = (codex.pid !== "") ?
			`/${codex.pid}` :
			"";
		const tab = this.props.params.tab == null ?
			"codex" :
			this.props.params.tab;

		subtab = subtab.toLowerCase().replace(/\s{1}|\/|\?/g, "-");
		const path = `/codex${pid}/edit/${tab}/${subtab}`;

		browserHistory.push(path);
	}

	render() {
		let model = this.props.value;

		let tab = (this.props.params.subtab != null) ?
			this.props.params.subtab :
			"general-information";

		return (
			<Tabs onChange={this.handleTabChange.bind(this)}>
				<Tab
					active={tab === "general-information"}
					label="General information">
					<h2>General information</h2>
					<GeneralInformationForm {...this.props}/>
				</Tab>
				<Tab active={tab === "quantitative-observations-on-marginal-activity"} label="Quantitative observations on marginal activity">
					<h2>Quantitative observations on marginal activity</h2>
					<ul className="codex-form">
						 <li className="well small-inputs marginal-activity">
						{/*<li className="well small-inputs">*/}
							<label>Quantities</label>
							<ul>
								<li>
									<label>Annotated pages %</label>
									<span className="percentage">{Math.round((model["marginalQuantities"].firstPagesWithMarginals / model["marginalQuantities"].firstPagesConsidered) * 100)+"%"}</span>
									(
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
										value={model["marginalQuantities"].firstPagesWithMarginals} />
									<span>out of </span>
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
										value={model["marginalQuantities"].firstPagesConsidered} />
									)
								</li>
								<li>
									<label>Blank pages %</label>
									<span className="percentage">{Math.round((model["marginalQuantities"].totalBlankPages / model.folia) * 100)+"%"}</span>
									(
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "totalBlankPages"])}
value={model["marginalQuantities"].totalBlankPages} />
									<span>out of {model.folia}</span>
									)
								</li>
								<li className="most-filled-page">
									<label>Most filled page %</label>
									<div className="input-percentage">
										<Input
											onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
											value={model["marginalQuantities"].mostFilledPagePctage} />
										<span className="percentage">%</span>
									</div>
									(
									<Input
										onChange={this.props.onFormChangeKey.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
										value={model["marginalQuantities"].mostFilledPageDesignation} />
									)
								</li>
							</ul>
						</li>
						<LiTextarea
							label="Summary"
							onChange={this.props.onFormChangeKey.bind(this, "marginalsSummary")}
							value={model.marginalsSummary}/>
					</ul>
				</Tab>
				<Tab active={tab === "date"} label="Date">
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
				<Tab active={tab === "where-made-used-"} label="Where made/used?">
					<h2>Where made/used?</h2>
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
				<Tab active={tab === "measurements"} label="Measurements">
					<h2>Measurements</h2>
					<ul className="codex-form">
						<li className="well small-inputs page-dimensions">
							<label>Page dimensions</label>
							<div>
								<label>
									<span>Height</span>
									<span>x</span>
									<span>width</span>
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
							label="Collation"
							onChange={this.props.onFormChangeKey.bind(this, "quireStructure")}
							value={model.quireStructure}/>
						<li className="well small-inputs">
							<label>Layout</label>
							<MultiForm
								{...this.props}
								addButtonValue="+"
								attr="pageLayouts"
								component={LayoutForm}
								model={layoutModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.pageLayouts}/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.onFormChangeKey.bind(this, "layoutRemarks")}
							value={model.layoutRemarks} />
					</ul>
				</Tab>
				<Tab active={tab === "script"} label="Script">
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
								component={PersonForm}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								values={model.script.scribes}/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.onFormChangeKey.bind(this, ["script", "scribeRemarks"])}
							value={model.script.scribeRemarks}/>
					</ul>
				</Tab>
				<Tab active={tab === "persons"} label="Persons">
					<h2>Persons</h2>
					<ul className="codex-form">
						{/*<li className="well">
							<label>Annotators</label>
							<MultiForm
								addButtonValue="+"
								attr={"annotators"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
								values={model.annotators}/>
						</li>*/}
						<li className="well">
							<label>Donors</label>
							<MultiForm
								addButtonValue="+"
								attr={"donors"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
								values={model.donors}/>
						</li>
						<li className="well">
							<label>Patrons</label>
							<MultiForm
								addButtonValue="+"
								attr={"patrons"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								persons={this.props.persons}
								values={model.patrons}/>
						</li>
					</ul>
				</Tab>
				<Tab active={tab === "bibliography"} label="Bibliography">
					<h2>Bibliography</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable
								onChange={this.props.onFormChangeKey.bind(this, "bibliographies")}
								values={model.bibliographies} />
						</li>
					</ul>
				</Tab>
				<Tab active={tab === "urls"} label="URLs">
					<h2>URLs</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable
								onChange={this.props.onFormChangeKey.bind(this, "URLs")}
								values={model.URLs} />
						</li>
					</ul>
				</Tab>
			</Tabs>
		);
	}
}

CodexForm.propTypes = {
	codices: React.PropTypes.object,
	onFormChangeKey: React.PropTypes.func,
	onFormDeleteKey: React.PropTypes.func,
	onFormInvalid: React.PropTypes.func,
	params: React.PropTypes.object,
	persons: React.PropTypes.array,
	value: React.PropTypes.object
};

CodexForm.defaultProps = {};

export default form(CodexForm);
