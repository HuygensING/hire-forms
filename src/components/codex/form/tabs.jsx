import React, { Component, PropTypes } from 'react';
import history from 'src/routes/history';
import Text from './text';
import Margin from './margin';
import Codex from './codex';
import Metadata from './metadata';
import Footer from './footer';
import ListEditor from './list-editor';
import { Tabs, Tab } from 'hire-tabs';

class CodexFormTabs extends Component {
	static propTypes = {
		authenticated: PropTypes.bool,
		codex: PropTypes.object,
		formChangeKey: PropTypes.func,
		formDeleteKey: PropTypes.func,
		formInvalid: PropTypes.func,
		// newCodex: PropTypes.func,
		setCodex: PropTypes.func,
		routeParams: PropTypes.object,
		persons: PropTypes.array,
		texts: PropTypes.array,
	}

	componentDidMount() {
		if (this.props.routeParams.id != null) {
			this.props.setCodex(this.props.routeParams.id);
		}
	}

	handleTabChange(label) {
		const codex = this.props.codex;
		const pid = (codex.pid !== '') ?
			`/${codex.pid}` :
			'';

		history.push(`/codex${pid}/edit/${label.toLowerCase()}`);
	}

	render() {
		if (!this.props.authenticated) {
			return <span className="unauthorized">Unauthorized. Please login.</span>;
		}

		const tab = this.props.routeParams.tab;
		const footer = <Footer {...this.props} />;

		return (
			<div className="codex-form">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === 'codex'}
						label="Codex"
					>
						<Codex
							{...this.props}
							onChange={this.props.formChangeKey}
						/>
						{(tab === 'codex') ? footer : null}
					</Tab>
					<Tab
						active={tab === 'text'}
						label="Text"
					>
						<Text {...this.props} />
						{(tab === 'text') ? footer : null}
					</Tab>
					<Tab
						active={tab === 'margin'}
						label="Margin"
					>
						<Margin {...this.props} />
						{(tab === 'margin') ? footer : null}
					</Tab>
					<Tab
						active={tab === 'meta'}
						label="Meta"
					>
						<Metadata
							formData={this.props.codex}
							onChange={this.props.formChangeKey}
							onDelete={this.props.formDeleteKey}
							onInvalid={this.props.formInvalid}
						/>
					{(tab === 'meta') ? footer : null}
					</Tab>
					<Tab
						active={tab === 'persons'}
						label="Persons"
					>
						<ListEditor type="person" />
					</Tab>
					<Tab
						active={tab === 'texts'}
						label="Texts"
					>
						<ListEditor type="text" />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default CodexFormTabs;
