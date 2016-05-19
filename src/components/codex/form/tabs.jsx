import React, { Component, PropTypes } from 'react';
import history from 'src/routes/history';
import Text from './text';
import Margin from './margin';
import Codex from './codex';
import Metadata from './metadata';
import Footer from './footer';
import ListEditor from './list-editor';
import { Tabs, Tab } from 'hire-tabs';

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

class CodexFormTabs extends Component {
	static propTypes = {
		authenticated: PropTypes.bool,
		codex: PropTypes.object,
		formChangeKey: PropTypes.func,
		formDeleteKey: PropTypes.func,
		formInvalid: PropTypes.func,
		setCodex: PropTypes.func,
		routeParams: PropTypes.object,
		persons: PropTypes.array,
		texts: PropTypes.array,
	}

	state = {
		tab: (this.props.routeParams.tab != null) ?
			capitalize(this.props.routeParams.tab) :
			'Codex',
	}

	componentDidMount() {
		if (this.props.routeParams.id != null) {
			this.props.setCodex(this.props.routeParams.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.routeParams.id != null &&
			this.props.routeParams.id !== nextProps.routeParams.id
		) {
			nextProps.setCodex(nextProps.routeParams.id);
		}
	}

	handleTabChange = (label) => {
		this.setState({ tab: label });

		let pid = this.props.codex.pid;
		if (pid !== '') pid = `/${pid}`;
		history.push(`/codex${pid}/edit/${label.toLowerCase()}`);
	}

	render() {
		if (!this.props.authenticated) {
			return null;
		}

		return (
			<div className="codex-form">
				<Tabs
					activeTab={this.state.tab}
					onChange={this.handleTabChange}
				>
					<Tab label="Codex">
						<Codex
							{...this.props}
							onChange={this.props.formChangeKey}
						/>
						<Footer {...this.props} />
					</Tab>
					<Tab label="Text">
						<Text {...this.props} />
						<Footer {...this.props} />
					</Tab>
					<Tab label="Margin">
						<Margin {...this.props} />
						<Footer {...this.props} />
					</Tab>
					<Tab label="Meta">
						<Metadata
							formData={this.props.codex}
							onChange={this.props.formChangeKey}
							onDelete={this.props.formDeleteKey}
							onInvalid={this.props.formInvalid}
						/>
						<Footer {...this.props} />
					</Tab>
					<Tab label="Persons">
						<ListEditor type="person" />
					</Tab>
					<Tab label="Texts">
						<ListEditor type="text" />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default CodexFormTabs;
