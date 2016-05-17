import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'hire-tabs';
import TabBody from './tab';

class TextUnit extends Component {
	static propTypes = {
		codex: PropTypes.object,
	}

	state = {
		tab: 'Text unit 1',
	};

	render() {
		const codex = this.props.codex;

		return (codex.textUnits.length === 0) ?
			<span className="empty">No text units found</span> :
			<Tabs
				activeTab={this.state.tab}
				className="sub-menu"
				onChange={(name) => this.setState({ tab: name })}
			>
				{codex.textUnits.map((textUnit, i) =>
					<Tab
						key={i}
						label={`Text unit ${i + 1}`}
					>
						<TabBody
							codex={codex}
							textUnit={textUnit}
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
)(TextUnit);
