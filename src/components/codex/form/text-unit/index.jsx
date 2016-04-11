import React from "react";
import {Tabs, Tab} from "hire-tabs";
import TextUnit from "./unit";
import Well from "../../../well";

const flatten = (prev, curr) => prev.concat(curr);

const unique = (prev, curr) =>
	(prev.indexOf(curr) === -1) ? prev.concat(curr) : prev

class Text extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: "Text unit 1"
		};
	}

	render() {
		let codex = this.props.codices.current;

		return (
			<Tabs
				className="sub-menu"
				onChange={(name) => this.setState({tab: name})}>
				{codex.textUnits.map((textUnit, i) =>
					<Tab
						active={this.state.tab === `Text unit ${i + 1}`}
						key={i}
						label={`Text unit ${i + 1}`}>
						<Well>
							<TextUnit
								attr={["textUnits", i]}
								formData={textUnit}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								onInvalid={this.props.onFormInvalid}/>
						</Well>
					</Tab>
				)}
			</Tabs>
		);
	}
}

Text.propTypes = {
	codices: React.PropTypes.object,
	onFormChangeKey: React.PropTypes.func,
	onFormDeleteKey: React.PropTypes.func,
	onFormInvalid: React.PropTypes.func
}

export default Text;
