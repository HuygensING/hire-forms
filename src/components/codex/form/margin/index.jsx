import React from 'react';
import { Tabs, Tab } from 'hire-tabs';
import MarginUnit from './unit';

class Margin extends React.Component {
	state = {
		tab: 'Margin unit 1',
	}

	render() {
		const codex = this.props.codex;

		return (
			<Tabs
				className="sub-menu"
				onChange={(name) => this.setState({ tab: name })}
			>
				{codex.marginUnits.map((marginUnit, i) =>
					<Tab
						active={this.state.tab === `Margin unit ${i + 1}`}
						key={i}
						label={`Margin unit ${i + 1}`}
					>
							<MarginUnit
								{...this.props}
								attr={['marginUnits', i]}
								formData={marginUnit}
								onChange={this.props.formChangeKey}
								onDelete={this.props.formDeleteKey}
								onInvalid={this.props.formInvalid}
							/>
					</Tab>
				)}
			</Tabs>
		);
	}
}

Margin.propTypes = {
	codex: React.PropTypes.object,
	formChangeKey: React.PropTypes.func,
	formDeleteKey: React.PropTypes.func,
	formInvalid: React.PropTypes.func,
};

export default Margin;
