import React from "react";
import {browserHistory} from "react-router";
import {Tabs, Tab} from "hire-tabs";
import Header from "./header";
import CodexUnit from "./codex";
import TextUnit from "./text";
import MarginUnit from "./margin";
import PersonsAndPlaces from "./persons-and-places";

class CodexRecord extends React.Component {
	componentDidMount() {
		this.props.onSetCodex(this.props.params.id);
	}

	handleTabChange(label) {
		let codex = this.props.codices.current;

		browserHistory.push(`/codex/${codex.pid}/${label.toLowerCase()}`);
	}

	render() {
		let codex = this.props.codices.current;

		let tab = (this.props.params.tab != null) ?
			this.props.params.tab :
			"codex";

		let facsimile = (codex.pid !== "") ?
			<img src={`https://cdn.huygens.knaw.nl/marginal-scholarship/images/${codex.pid}.jpg`} /> :
			null;

		const header = <Header {...this.props}/>

		return (
			<div className="codex-record">
				<Tabs onChange={this.handleTabChange.bind(this)}>
					<Tab
						active={tab === "codex"}
						label="Codex">
						{header}
						<div className="codex-record-body">
							<CodexUnit {...this.props}/>
							{facsimile}
						</div>
					</Tab>
					<Tab
						active={tab === "text"}
						label="Text">
						{header}
						<div className="codex-record-body">
							<TextUnit {...this.props}/>
							{facsimile}
						</div>
					</Tab>
					<Tab
						active={tab === "margin"}
						label="Margin">
						{header}
						<div className="codex-record-body">
							<MarginUnit {...this.props}/>
							{facsimile}
						</div>
					</Tab>
					<Tab
						active={tab === "persons & places"}
						label="Persons & Places">
						{header}
						<div className="codex-record-body">
							<PersonsAndPlaces {...this.props}/>
							{facsimile}
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

CodexRecord.propTypes = {
	codices: React.PropTypes.object,
	onSetCodex: React.PropTypes.func,
	params: React.PropTypes.object,
	user: React.PropTypes.object
};

export default CodexRecord;
