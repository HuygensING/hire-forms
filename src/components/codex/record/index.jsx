import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'hire-tabs';
import { setCodex } from '../../../actions/codices';
import Header from './header';
import Codex from './codex';
import Text from './text';
import Margin from './margin';
import PersonsAndPlaces from './persons-and-places';
import { facsimileUrl } from '../../../config';

class CodexRecord extends Component {
	static propTypes = {
		codex: PropTypes.object,
		routeParams: PropTypes.object,
		setCodex: PropTypes.func,
	};

	componentDidMount() {
		this.props.setCodex(this.props.routeParams.id);
	}

	componentDidUpdate() {
		const codex = this.props.codex;
		if (codex.pid === '') return;
		const url = `${facsimileUrl}${codex.pid}.jpg`;

		const img = this.refs.facsimile;

		const onError = () => {
			img.src = '/images/placeholder.svg';
			img.removeEventListener('error', onError);
		};

		img.addEventListener('error', onError);
		img.src = url;
	}

	handleTabChange(label) {
		const codex = this.props.codex;
		const path = `/codex/${codex.pid}/${label.toLowerCase()}`;
		browserHistory.push(path);
	}

	render() {
		const tab = (this.props.routeParams.tab !== undefined) ?
			this.props.routeParams.tab :
			'codex';

		const facsimile = <img alt="Facsimile" ref="facsimile" />;
		const header = <Header {...this.props} />;

		return (
			<div className="codex-record">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === 'codex'}
						label="Codex"
					>
						{header}
						<div className="codex-record-body">
							<Codex />
							{(tab === 'codex') ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === 'text'}
						label="Text"
					>
						{header}
						<div className="codex-record-body">
							<Text {...this.props} />
							{(tab === 'text') ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === 'margin'}
						label="Margin"
					>
						{header}
						<div className="codex-record-body">
							<Margin {...this.props} />
							{(tab === 'margin') ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === 'persons & places'}
						label="Persons & Places"
					>
						{header}
						<div className="codex-record-body">
							<PersonsAndPlaces {...this.props} />
							{(tab === 'persons & places') ? facsimile : null}
						</div>
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
