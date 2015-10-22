import React from "react";
import Textarea from "hire-forms-textarea";

class LiTextarea extends React.Component {
	render() {
		return (
			<li className="well li-textarea">
				<label>{this.props.label}</label>
				<div>
					<Textarea
						onChange={this.props.onChange}
						value={this.props.value} />
				</div>
			</li>
		);
	}
}

LiTextarea.defaultProps = {
	value: ""
}

LiTextarea.propTypes = {
	label: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.string
}

export default LiTextarea;