import React, { Component, PropTypes } from 'react';
import history from 'src/routes/history';
import form from 'hire-forms-form';
import MutableList from 'hire-forms-mutable-list';
import GeneralInformationForm from './general-information';
import Date from './date';
import WhereMadeUsed from './where-made-used';
import QuantitativeObservations from './quantitative-observations';
import Persons from './persons';
import Measurements from './measurements';
import Script from './script';
import { Tabs, Tab } from 'hire-tabs';

const TAB_LABELS = {
	'general-information': 'General information',
	'quantitative-observations-on-marginal-activity':
		'Quantitative observations on marginal activity',
	date: 'Date',
	'where-made-used': 'Where made/used?',
	measurements: 'Measurements',
	script: 'Script',
	persons: 'Persons',
	bibliography: 'Bibliography',
	urls: 'URLs',
};

class CodexForm extends Component {
	static propTypes = {
		codex: PropTypes.object,
		facetData: PropTypes.object,
		formChangeKey: PropTypes.func,
		formDeleteKey: PropTypes.func,
		formInvalid: PropTypes.func,
		routeParams: PropTypes.object,
		persons: PropTypes.array,
		value: PropTypes.object,
	};

	getUrlPath() {
		let id = this.props.codex.pid;
		if (id !== '') id = `/${id}`;
		return `/codex${id}/edit`;
	}

	handleTabChange = (subtab) => {
		const tab = this.props.routeParams.tab;
		const labelSlug = Object.keys(TAB_LABELS).filter((slug) =>
			subtab === TAB_LABELS[slug]
		);
		const path = `${this.getUrlPath()}/${tab}/${labelSlug}`;
		history.push(path);
	}

	render() {
		const model = this.props.codex;
		const subtab = this.props.routeParams.subtab;

		return (
			<Tabs
				activeTab={(subtab != null) ? TAB_LABELS[subtab] : 'General information'}
				onChange={this.handleTabChange}
			>
				<Tab label="General information">
					<h2>General information</h2>
					<GeneralInformationForm { ...this.props } />
				</Tab>
				<Tab label="Quantitative observations on marginal activity">
					<h2>Quantitative observations on marginal activity</h2>
					<QuantitativeObservations {...this.props} />
				</Tab>
				<Tab label="Date">
					<h2>Date</h2>
					<Date { ...this.props } />
				</Tab>
				<Tab label="Where made/used?">
					<h2>Where made/used?</h2>
					<WhereMadeUsed { ...this.props } />
				</Tab>
				<Tab label="Measurements">
					<h2>Measurements</h2>
					<Measurements {...this.props} />
				</Tab>
				<Tab label="Script">
					<h2>Script</h2>
					<Script {...this.props} />
				</Tab>
				<Tab label="Persons">
					<h2>Persons</h2>
					<Persons {...this.props} />
				</Tab>
				<Tab label="Bibliography">
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
				<Tab label="URLs">
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
