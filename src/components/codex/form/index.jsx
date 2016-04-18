import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Text from './text';
import Margin from './margin';
import CodexForm from './codex';
import Metadata from './metadata';
import Footer from './footer';
import ListEditor from './list-editor';
import { Tabs, Tab } from 'hire-tabs';
import { formChangeKey, formDeleteKey, formInvalid } from '../../../actions/form';
import { newCodex, setCodex } from '../../../actions/codices';

class CodexFormController extends Component {
	static propTypes = {
		authenticated: PropTypes.bool,
		codex: PropTypes.object,
		formChangeKey: PropTypes.func,
		formDeleteKey: PropTypes.func,
		formInvalid: PropTypes.func,
		newCodex: PropTypes.func,
		setCodex: PropTypes.func,
		routeParams: PropTypes.object,
		persons: PropTypes.array,
		texts: PropTypes.array,
	}

	componentDidMount() {
		if (this.props.routeParams.id !== null) {
			this.props.setCodex(this.props.routeParams.id);
		} else {
			this.props.newCodex();
		}
	}

	componentWillReceiveProps() {
		// When transitioning from an existing codex to a new codex,
		// the new (default) codex has to be set to the data store.
		if (this.props.routeParams.id === null && this.props.codex.id !== null) {
			this.props.onNewCodex();
		}
	}

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.codices !== nextProps.codices || // Codex changed
	// 		this.props.routeParams !== nextProps.routeParams || // URL routeParams changed
	// 		this.props.persons !== nextProps.persons || // List of persons changed
	// 		this.props.texts !== nextProps.texts || // List of texts changed
	// 		this.props.user !== nextProps.user; // The user changed
	// }

	handleTabChange(label) {
		const codex = this.props.codex;
		const pid = (codex.pid !== '') ?
			`/${codex.pid}` :
			'';

		browserHistory.push(`/codex${pid}/edit/${label.toLowerCase()}`);
	}

	render() {
		if (!this.props.authenticated) {
			return <span className="unauthorized">Unauthorized. Please login.</span>;
		}

		let codex = this.props.codex;

		const tab = (this.props.routeParams.tab !== null) ?
			this.props.routeParams.tab :
			'codex';

		const footer = <Footer {...this.props} />;

		return (
			<div className="codex-form">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === 'codex'}
						label="Codex"
					>
						<CodexForm
							{...this.props}
							onChange={this.props.formChangeKey}
							value={codex}
						/>
						{(tab === '.*') ? footer : null}
					</Tab>
					<Tab
						active={tab === '.*'}
						label="Text"
					>
						<Text {...this.props} />
						{(tab === '.*') ? footer : null}
					</Tab>
					<Tab
						active={tab === '.*'}
						label="Margin"
					>
						<Margin {...this.props} />
						{(tab === '.*') ? footer : null}
					</Tab>
					<Tab
						active={tab === '.*'}
						label="Meta"
					>
						<Metadata
							formData={codex}
							onChange={this.props.formChangeKey}
							onDelete={this.props.formDeleteKey}
							onInvalid={this.props.formInvalid}
						/>
						{(tab === '.*') ? footer : null}
					</Tab>
					<Tab
						active={tab === '.*'}
						label="Persons"
					>
						<ListEditor
							{...this.props}
							type="person"
							values={this.props.persons}
						/>
					</Tab>
					<Tab
						active={tab === '.*'}
						label="Texts"
					>
						<ListEditor
							{...this.props}
							type="text"
							values={this.props.texts}
						/>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default connect(
	state => ({
		authenticated: state.user.authenticated,
		codex: state.codices.current,
	}),
	{
		formChangeKey,
		formDeleteKey,
		formInvalid,
		newCodex,
		setCodex,
	},
)(CodexFormController);
