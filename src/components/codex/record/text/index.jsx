import React, { Component, PropTypes } from 'react';
import TextUnit from './unit';

class TextUnits extends Component {
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
			<div>
				{
					codex.textUnits.map((textUnit, index) =>
						<TextUnit
							codex={codex}
							key={index}
							textUnit={textUnit}
						/>
					)
				}
			</div>;
	}
}

export default TextUnits;
