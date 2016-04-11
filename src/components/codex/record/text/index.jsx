import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {Tabs, Tab} from "hire-tabs";
import Text from "../elements/text";
import Well from "../../../well";

const flatten = (prev, curr) => prev.concat(curr);

const unique = (prev, curr) =>
	(prev.indexOf(curr) === -1) ? prev.concat(curr) : prev

class TextUnit extends Component {
	static propTypes = {
		codex: PropTypes.object
	}

	state = {
		tab: "Text unit 1"
	};

	render() {
		let codex = this.props.codex;

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
							<div className="list">
								<label>Author</label>
								<ul>{
									codex.textUnits
										.map((textUnit) =>
											textUnit.text.authors.map((author, index) =>
												<li key={Math.random()}>{author.person.value}</li>
											)
										)
										.reduce(flatten, [])
										.reduce(unique, [])
								}</ul>
							</div>
							<Text label="Title">{textUnit.text.title}</Text>
							<Text label="Title in codex">{textUnit.titleInCodex}</Text>
							<Text label="Incipit">{textUnit.incipit}</Text>
							<Text label="Explicit">{textUnit.explicit}</Text>
							<Text label="State of preservation">{textUnit.stateOfPreservation}</Text>
							<Text label="Page range">{textUnit.pages}</Text>
							<Text label="Language">{textUnit.text.language}</Text>
							<Text label="Period">{textUnit.text.period}</Text>
							<Text label="Genre">{textUnit.contentTypes}</Text>
						</Well>
					</Tab>
				)}
			</Tabs>
		);
	}
}

export default connect(
	state => ({
		codex: state.codices.current
	})
)(TextUnit);
