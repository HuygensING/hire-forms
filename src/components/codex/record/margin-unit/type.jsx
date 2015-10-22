import React from "react";
import Text from "../elements/text";

class Type extends React.Component {
	render() {
		return (
			<div className={this.props.className}>
				<Text label="Type">{this.props.data.type}</Text>
				<Text label="Quantification">{this.props.data.quantification}</Text>
				<Text label="Remarks">{this.props.data.remarks}</Text>
			</div>
		);
	}
}

export default Type;