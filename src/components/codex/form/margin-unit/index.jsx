import React from "react";
import {Tabs, Tab} from "hire-tabs";
import MarginUnit from "./unit";
import Well from "../../../well";

const flatten = (prev, curr) => prev.concat(curr);

const unique = (prev, curr) =>
	(prev.indexOf(curr) === -1) ? prev.concat(curr) : prev

class Margin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: "Margin unit 1"
		};
	}

	render() {
		let codex = this.props.codices.current;

		return (
			<Tabs
				className="sub-menu"
				onChange={(name) => this.setState({tab: name})}>
				{codex.marginUnits.map((marginUnit, i) =>
					<Tab
						active={this.state.tab === `Margin unit ${i + 1}`}
						key={i}
						label={`Margin unit ${i + 1}`}>
							<MarginUnit
                {...this.props}
								attr={["marginUnits", i]}
								formData={marginUnit}
								onChange={this.props.onFormChangeKey}
								onDelete={this.props.onFormDeleteKey}
								onInvalid={this.props.onFormInvalid}/>
					</Tab>
				)}
			</Tabs>
		);
	}
}

Margin.propTypes = {
	codices: React.PropTypes.object,
	onFormChangeKey: React.PropTypes.func,
	onFormDeleteKey: React.PropTypes.func,
	onFormInvalid: React.PropTypes.func
}

export default Margin;
