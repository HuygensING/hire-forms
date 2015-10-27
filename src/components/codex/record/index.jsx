import React from "react";
import {Link} from "react-router";

import {Tabs, Tab} from "hire-tabs";
import CodexUnit from "./codex-unit";
import TextUnit from "./text-unit";
import MarginUnit from "./margin-unit";
import PersonsAndPlaces from "./persons-and-places";
import EditIcon from "./edit-icon";

class CodexRecord extends React.Component {
	componentDidMount() {
		this.props.onSetCodex(this.props.params.id);
	}

	handleTabChange(label) {
		let codex = this.props.codices.current;

		this.props.history.pushState(null, `/codex/${codex.pid}/${label.toLowerCase()}`);
	}

	render() {
		let codex = this.props.codices.current;

		let tab = (this.props.params.tab != null) ?
			this.props.params.tab :
			"codex";

		let linkToEdit = this.props.user.authenticated ?
			<Link to={`/codex/${codex.pid}/edit`}>{<EditIcon />}</Link> :
			null;

		let header = (
			<header>
				<h2>{codex.name}</h2>
				{linkToEdit}
			</header>
		);

		let facsimile = (codex.pid !== "") ?
			<img src={`https://cdn.huygens.knaw.nl/marginal-scholarship/images/${codex.pid}.jpg`} /> :
			null;

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
	params: React.PropTypes.object
};

export default CodexRecord;