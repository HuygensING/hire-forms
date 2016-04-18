import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import form from 'hire-forms-form';
import MultiForm from 'hire-forms-multi-form';
import Input from 'hire-forms-input';
import SelectList from 'hire-forms-select-list';
import MutableList from 'hire-forms-mutable-list';
import LiTextarea from '../elements/li-textarea';
import GeneralInformationForm from './general-information';
import DateAndLocalityForm from '../elements/date-and-locality';
import LayoutForm from '../elements/layout';
import PersonForm from '../elements/person';
import { Tabs, Tab } from 'hire-tabs';
import {
	personModel,
	layoutModel,
	dateAndLocalityModel,
} from '../../../../models';
import { formChangeKey, formDeleteKey, formInvalid } from '../../../../actions/form';

class CodexForm extends Component {
	static propTypes = {
		codex: PropTypes.object,
		formChangeKey: PropTypes.func,
		formDeleteKey: PropTypes.func,
		formInvalid: PropTypes.func,
		routeParams: PropTypes.object,
		persons: PropTypes.array,
		value: PropTypes.object,
	};

	componentWillReceiveProps({ codex, routeParams }) {
		if (routeParams.tab === null && codex.pid !== '') {
			const path = `/codex/${codex.pid}/edit/codex`;
			browserHistory.replace(path);
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	let valueChanged = this.props.value !== nextProps.value;
	// 	let paramsChanged = this.props.routeParams !== nextProps.params;
	// 	return valueChanged || paramsChanged;
	// }

	handleTabChange(subtab) {
		const codex = this.props.codex;
		const pid = (codex.pid !== '') ?
			`/${codex.pid}` :
			'';
		const tab = this.props.routeParams.tab === null ?
			'codex' :
			this.props.routeParams.tab;

		const slug = subtab.toLowerCase().replace(/\s{1}|\/|\?/g, '-');
		const path = `/codex${pid}/edit/${tab}/${slug}`;

		browserHistory.push(path);
	}

	render() {
		const model = this.props.value;

		const tab = (this.props.routeParams.subtab !== null) ?
			this.props.routeParams.subtab :
			'general-information';

		return (
			<Tabs onChange={this.handleTabChange.bind(this)}>
				<Tab
					active={tab === 'general-information'}
					label="General information"
				>
					<h2>General information</h2>
					<GeneralInformationForm value={model} />
				</Tab>
				<Tab
					active={tab === 'quantitative-observations-on-marginal-activity'}
					label="Quantitative observations on marginal activity"
				>
					<h2>Quantitative observations on marginal activity</h2>
					<ul className="codex-form">
						<li className="well small-inputs marginal-activity">
						{/* <li className="well small-inputs"> */}
							<label>Quantities</label>
							<ul>
								<li>
									<label>Annotated pages %</label>
								<span className="percentage">{Math.round((model.marginalQuantities.firstPagesWithMarginals / model.marginalQuantities.firstPagesConsidered) * 100)+"%"}</span>
									(
									<Input
										onChange={this.props.formChangeKey.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
										value={model.marginalQuantities.firstPagesWithMarginals}
									/>
									<span>out of </span>
									<Input
										onChange={this.props.formChangeKey.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
										value={model.marginalQuantities.firstPagesConsidered}
									/>
									)
								</li>
								<li>
									<label>Blank pages %</label>
								<span className="percentage">{Math.round((model.marginalQuantities.totalBlankPages / model.folia) * 100)+"%"}</span>
									(
									<Input
										onChange={this.props.formChangeKey.bind(this, ["marginalQuantities", "totalBlankPages"])}
										value={model.marginalQuantities.totalBlankPages}
									/>
									<span>out of {model.folia}</span>
									)
								</li>
								<li className="most-filled-page">
									<label>Most filled page %</label>
									<div className="input-percentage">
										<Input
											onChange={this.props.formChangeKey.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
											value={model.marginalQuantities.mostFilledPagePctage}
										/>
										<span className="percentage">%</span>
									</div>
									(
									<Input
										onChange={this.props.formChangeKey.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
										value={model.marginalQuantities.mostFilledPageDesignation}
									/>
									)
								</li>
							</ul>
						</li>
						<LiTextarea
							label="Summary"
							onChange={this.props.formChangeKey.bind(this, "marginalsSummary")}
							value={model.marginalsSummary}
						/>
					</ul>
				</Tab>
				<Tab active={tab === 'date'} label="Date">
					<h2>Date</h2>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Date</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, "date")}
										value={model.date}
									/>
								</li>
								<li>
									<label>Source</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, "dateSource")}
										value={model.dateSource}
									/>
								</li>
							</ul>
						</li>
					</ul>
				</Tab>
				<Tab active={tab === 'where-made-used-'} label="Where made/used?">
					<h2>Where made/used?</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Origin</label>
							<DateAndLocalityForm
								attr={"origin"}
								formData={model.origin}
								onChange={this.props.formChangeKey}
								onInvalid={this.props.formInvalid}
								showDate={false}
							/>
						</li>
						<li className="well">
							<label>Provenance</label>
							<MultiForm
								addButtonValue="+"
								attr={"provenances"}
								component={DateAndLocalityForm}
								model={dateAndLocalityModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								onInvalid={this.props.formInvalid}
								values={model.provenances}
							/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.formChangeKey.bind(this, "dateAndLocaleRemarks")}
							value={model.dateAndLocaleRemarks}
						/>
					</ul>
				</Tab>
				<Tab active={tab === 'measurements'} label="Measurements">
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
									onChange={this.props.formChangeKey.bind(this, "pageDimensionHeight")}
									value={model.pageDimensionHeight}
								/>
								<span>mm</span>
								<span>x</span>
								<Input
									onChange={this.props.formChangeKey.bind(this, "pageDimensionWidth")}
									value={model.pageDimensionWidth}
								/>
								<span>mm</span>
							</div>
						</li>
						<LiTextarea
							label="Collation"
							onChange={this.props.formChangeKey.bind(this, "quireStructure")}
							value={model.quireStructure}
						/>
						<li className="well small-inputs">
							<label>Layout</label>
							<MultiForm
								{...this.props}
								addButtonValue="+"
								attr="pageLayouts"
								component={LayoutForm}
								model={layoutModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								values={model.pageLayouts}
							/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.formChangeKey.bind(this, "layoutRemarks")}
							value={model.layoutRemarks}
						/>
					</ul>
				</Tab>
				<Tab active={tab === 'script'} label="Script">
					<h2>Script</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Type</label>
							<SelectList
								onChange={this.props.formChangeKey.bind(this, ["script", "types"])}
								options={["Anglo-Saxon majuscule", "Anglo-Saxon minuscule", "Caroline minuscule", "German minuscule", "Gothic minuscule", "Insular semi-uncial", "Uncialis", "early Caroline minuscule", "pre-Caroline minuscule"]}
								values={model.script.types}
							/>
						</li>
					</ul>
					<ul className="codex-form">
						<LiTextarea
							label="Type remarks"
							onChange={this.props.formChangeKey.bind(this, ["script", "remarks"])}
							value={model.script.remarks}
						/>
					</ul>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Characteristics</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ["script", "characteristics"])}
										value={model.script.characteristics}
									/>
								</li>
								<li>
									<label>Number of hands</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ["script", "handsCount"])}
										value={model.script.handsCount}
									/>
								</li>
								<li>
									<label>Range</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ["script", "handsRange"])}
										value={model.script.handsRange}
									/>
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
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								values={model.script.scribes}
							/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.formChangeKey.bind(this, ["script", "scribeRemarks"])}
							value={model.script.scribeRemarks}
						/>
					</ul>
				</Tab>
				<Tab active={tab === 'persons'} label="Persons">
					<h2>Persons</h2>
					<ul className="codex-form">
						{/*<li className="well">
							<label>Annotators</label>
							<MultiForm
								addButtonValue="+"
								attr={"annotators"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								persons={this.props.persons}
								values={model.annotators}
							/>
						</li>*/}
						<li className="well">
							<label>Donors</label>
							<MultiForm
								addButtonValue="+"
								attr={"donors"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								persons={this.props.persons}
								values={model.donors}
							/>
						</li>
						<li className="well">
							<label>Patrons</label>
							<MultiForm
								addButtonValue="+"
								attr={"patrons"}
								component={PersonForm}
								model={personModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								persons={this.props.persons}
								values={model.patrons}
							/>
						</li>
					</ul>
				</Tab>
				<Tab active={tab === 'bibliography'} label="Bibliography">
					<h2>Bibliography</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable
								onChange={this.props.formChangeKey.bind(this, "bibliographies")}
								values={model.bibliographies}
							/>
						</li>
					</ul>
				</Tab>
				<Tab active={tab === 'urls'} label="URLs">
					<h2>URLs</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable
								onChange={this.props.formChangeKey.bind(this, "URLs")}
								values={model.URLs}
							/>
						</li>
					</ul>
				</Tab>
			</Tabs>
		);
	}
}


export default connect(
	state => ({
		codex: state.codices.current,
	}),
	{
		formChangeKey,
		formDeleteKey,
		formInvalid,
	}
)(form(CodexForm));
