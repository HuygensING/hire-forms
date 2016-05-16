import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'hire-tabs';
import { setCodex } from '../../../actions/codices';
import Codex from './codex';
import Text from './text';
import Margin from './margin';
import PersonsAndPlaces from './persons-and-places';
import Body from './tab-body';
import Header from './header';

const TAB_LABELS = {
	codex: 'Codex',
	text: 'Text',
	margin: 'Margin',
	'persons-and-places': 'Persons & Places',
};

class CodexRecord extends Component {
	static propTypes = {
		codex: PropTypes.object,
		routeParams: PropTypes.object,
		setCodex: PropTypes.func,
	};

	componentDidMount() {
		this.props.setCodex(this.props.routeParams.id);
	}


	handleTabChange(label) {
		const codex = this.props.codex;
		const labelSlug = Object.keys(TAB_LABELS).filter((slug) =>
			label === TAB_LABELS[slug]
		);
		const path = `/codex/${codex.pid}/${labelSlug}`;
		browserHistory.push(path);
	}

	render() {
		const tab = this.props.routeParams.tab;

		return (
			<div className="codex-record">
				<Tabs
					activeTab={(tab != null) ? TAB_LABELS[tab] : 'Codex'}
					onChange={this.handleTabChange.bind(this)}
				>
					<Tab label="Codex">
						<Header />
						<Body {...this.props}>
							<Codex />
						</Body>
					</Tab>
					<Tab label="Text">
						<Header />
						<Body {...this.props}>
							<Text {...this.props} />
						</Body>
					</Tab>
					<Tab label="Margin">
						<Header />
						<Body {...this.props}>
							<Margin {...this.props} />
						</Body>
					</Tab>
					<Tab label="Persons & Places">
						<Header />
						<Body {...this.props}>
							<PersonsAndPlaces {...this.props} />
						</Body>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default connect(
	state => ({
		codex: state.codices.current,
	}),
	{ setCodex }
)(CodexRecord);
