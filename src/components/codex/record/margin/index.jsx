import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'hire-tabs';
import TabBody from './tab';

class MarginUnit extends Component {
	static propTypes = {
		codex: PropTypes.object,
	};

	state = {
		tab: 'Margin unit 1',
	};

	render() {
		const codex = this.props.codex;

		return (codex.marginUnits.length === 0) ?
			<span className="empty">No margin units found</span> :
			<Tabs
				activeTab={this.state.tab}
				className="sub-menu"
				onChange={(name) => this.setState({ tab: name })}
			>
				{codex.marginUnits.map((marginUnit, index) =>
					<Tab
						key={index}
						label={`Margin unit ${index + 1}`}
					>
						<TabBody
							marginUnit={marginUnit}
						/>
					</Tab>
				)}
			</Tabs>;
	}
}

export default connect(
	state => ({
		codex: state.codices.current,
	})
)(MarginUnit);
