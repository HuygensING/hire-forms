import React, { PropTypes } from 'react';
import MarginUnit from './unit';
import Unit from 'formElements/unit';

function Margin(props) {
	return (
		<Unit
			{ ...props }
			component={MarginUnit}
			label="Margin"
			propName="marginUnits"
			type="margin"
		/>
	);
}

Margin.propTypes = {
	codex: PropTypes.object,
};

export default Margin;

// import React, { PropTypes } from 'react';
// import { Tabs, Tab } from 'hire-tabs';
// import MarginUnit from './unit';
//
// class Margin extends React.Component {
// 	state = {
// 		tab: 'Margin unit 1',
// 	}
//
// 	addUnit() {
// 		this.props.addUnit('margin');
// 		this.setState({
// 			tab: `Margin unit ${this.props.codex.marginUnits.length + 1}`,
// 		});
// 	}
//
// 	render() {
// 		const codex = this.props.codex;
//
// 		return (
// 			<div className="margin">
// 				<Tabs
// 					className="sub-menu"
// 					onChange={(name) => this.setState({ tab: name })}
// 				>
// 					{codex.marginUnits.map((marginUnit, i) =>
// 						<Tab
// 							active={this.state.tab === `Margin unit ${i + 1}`}
// 							key={i}
// 							label={`Margin unit ${i + 1}`}
// 						>
// 								<MarginUnit
// 									{...this.props}
// 									attr={['marginUnits', i]}
// 									formData={marginUnit}
// 									onChange={this.props.formChangeKey}
// 									onDelete={this.props.formDeleteKey}
// 									onInvalid={this.props.formInvalid}
// 								/>
// 						</Tab>
// 					)}
// 				</Tabs>
// 				<button
// 					className="add-unit"
// 					onClick={this.addUnit.bind(this)}
// 				>
// 					Add margin unit
// 				</button>
// 			</div>
// 		);
// 	}
// }
//
// Margin.propTypes = {
// 	addUnit: PropTypes.func,
// 	codex: PropTypes.object,
// 	formChangeKey: PropTypes.func,
// 	formDeleteKey: PropTypes.func,
// 	formInvalid: PropTypes.func,
// };
//
// export default Margin;
