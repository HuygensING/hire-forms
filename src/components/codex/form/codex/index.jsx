import React, { Component, PropTypes } from 'react';
import history from 'src/routes/history';
import form from 'hire-forms-form';
import MultiForm from 'hire-forms-multi-form';
import Input from 'hire-forms-input';
import SelectList from 'hire-forms-select-list';
import MutableList from 'hire-forms-mutable-list';
import LiTextarea from 'formElements/li-textarea';
import GeneralInformationForm from './general-information';
import WhereMadeUsed from './where-made-used';
import QuantitativeObservations from './quantitative-observations';
import Persons from './persons';
import PersonForm from 'formElements/person';
import Measurements from './measurements';
import { Tabs, Tab } from 'hire-tabs';
import {
	personModel,
} from 'src/models';

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

	getUrlPath() {
		const id = (this.props.codex.pid !== '') ?
			`${this.props.codex.pid}/` :
			'';

		return `/codex/${id}edit`;
	}

	handleTabChange(subtab) {
		const tab = this.props.routeParams.tab;
		const slug = subtab.toLowerCase().replace(/\s{1}|\/|\?/g, '-');
		const path = `${this.getUrlPath()}/${tab}/${slug}`;
		history.push(path);
	}

	render() {
		const model = this.props.codex;
		const tab = this.props.routeParams.subtab;

		return (
			<Tabs onChange={this.handleTabChange.bind(this)}>
				<Tab
					active={tab === 'general-information'}
					label="General information"
				>
					<h2>General information</h2>
					<GeneralInformationForm { ...this.props } />
				</Tab>
				<Tab
					active={tab === 'quantitative-observations-on-marginal-activity'}
					label="Quantitative observations on marginal activity"
				>
					<h2>Quantitative observations on marginal activity</h2>
					<QuantitativeObservations {...this.props} />
				</Tab>
				<Tab active={tab === 'date'} label="Date">
					<h2>Date</h2>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Date</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, 'date')}
										value={model.date}
									/>
								</li>
								<li>
									<label>Source</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, 'dateSource')}
										value={model.dateSource}
									/>
								</li>
							</ul>
						</li>
					</ul>
				</Tab>
				<Tab active={tab === 'where-made-used-'} label="Where made/used?">
					<h2>Where made/used?</h2>
					<WhereMadeUsed { ...this.props } />
				</Tab>
				<Tab active={tab === 'measurements'} label="Measurements">
					<h2>Measurements</h2>
					<Measurements {...this.props} />
				</Tab>
				<Tab active={tab === 'script'} label="Script">
					<h2>Script</h2>
					<ul className="codex-form">
						<li className="well">
							<label>Type</label>
							<SelectList
								onChange={this.props.formChangeKey.bind(this, ['script', 'types'])}
								options={['Anglo-Saxon majuscule', 'Anglo-Saxon minuscule', 'Caroline minuscule', 'German minuscule', 'Gothic minuscule', 'Insular semi-uncial', 'Uncialis', 'early Caroline minuscule', 'pre-Caroline minuscule']}
								values={model.script.types}
							/>
						</li>
					</ul>
					<ul className="codex-form">
						<LiTextarea
							label="Type remarks"
							onChange={this.props.formChangeKey.bind(this, ['script', 'remarks'])}
							value={model.script.remarks}
						/>
					</ul>
					<ul className="codex-form">
						<li className="well">
							<ul>
								<li>
									<label>Characteristics</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ['script', 'characteristics'])}
										value={model.script.characteristics}
									/>
								</li>
								<li>
									<label>Number of hands</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ['script', 'handsCount'])}
										value={model.script.handsCount}
									/>
								</li>
								<li>
									<label>Range</label>
									<Input
										onChange={this.props.formChangeKey.bind(this, ['script', 'handsRange'])}
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
								attr={['script', 'scribes']}
								component={PersonForm}
								model={personModel}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								values={model.script.scribes}
							/>
						</li>
						<LiTextarea
							label="Remarks"
							onChange={this.props.formChangeKey.bind(this, ['script', 'scribeRemarks'])}
							value={model.script.scribeRemarks}
						/>
					</ul>
				</Tab>
				<Tab active={tab === 'persons'} label="Persons">
					<h2>Persons</h2>
					<Persons {...this.props} />
				</Tab>
				<Tab active={tab === 'bibliography'} label="Bibliography">
					<h2>Bibliography</h2>
					<ul className="codex-form">
						<li className="well">
							<MutableList
								editable
								onChange={this.props.formChangeKey.bind(this, 'bibliographies')}
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
								onChange={this.props.formChangeKey.bind(this, 'URLs')}
								values={model.URLs}
							/>
						</li>
					</ul>
				</Tab>
			</Tabs>
		);
	}
}

export default form(CodexForm);
