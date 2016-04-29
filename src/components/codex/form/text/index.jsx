import React, { PropTypes } from 'react';
import TextUnit from './unit';
import Unit from 'formElements/unit';

function Text(props) {
	return (
		<Unit
			{ ...props }
			component={TextUnit}
			label="Text"
			propName="textUnits"
			type="text"
		/>
	);
}

Text.propTypes = {
	codex: PropTypes.object,
};

export default Text;
// import React, { Component, PropTypes } from 'react'; import { Tabs, Tab } from 'hire-tabs'; import TextUnit from './unit'; import Well from 'src/components/well'; class Text extends Component { constructor(props) { super(props);
//
// 		this.state = {
// 			tab: 'Text unit 1',
// 		};
// 	}
//
// 	render() {
// 		const codex = this.props.codex;
//
// 		return (
// 			<div className="text">
// 				<Tabs
// 					className="sub-menu"
// 					onChange={(name) => this.setState({ tab: name })}
// 				>
// 					{codex.textUnits.map((textUnit, i) =>
// 						<Tab
// 							active={this.state.tab === `Text unit ${i + 1}`}
// 							key={i}
// 							label={`Text unit ${i + 1}`}
// 						>
// 							<Well>
// 								<TextUnit
// 									{...this.props}
// 									attr={['textUnits', i]}
// 									formData={textUnit}
// 									onChange={this.props.formChangeKey}
// 									onDelete={this.props.formDeleteKey}
// 									onInvalid={this.props.formInvalid}
// 								/>
// 							</Well>
// 						</Tab>
// 					)}
// 				</Tabs>
// 				<button
// 					className="add-unit"
// 					onClick={this.props.addUnit.bind(this, 'text')}
// 				>
// 					Add text unit
// 				</button>
// 			</div>
// 		);
// 	}
// }
//
// Text.propTypes = {
// 	codex: PropTypes.object,
// 	formChangeKey: PropTypes.func,
// 	formDeleteKey: PropTypes.func,
// 	formInvalid: PropTypes.func,
// };
//
// export default Text;
