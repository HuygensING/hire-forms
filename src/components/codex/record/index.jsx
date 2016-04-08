import React from "react";
import {browserHistory} from "react-router";
import {Tabs, Tab} from "hire-tabs";
import Header from "./header";
import CodexUnit from "./codex";
import TextUnit from "./text";
import MarginUnit from "./margin";
import PersonsAndPlaces from "./persons-and-places";
import {facsimileUrl} from "../../../config";

class CodexRecord extends React.Component {
	componentDidMount() {
		this.props.onSetCodex(this.props.params.id);
	}

	componentDidUpdate(prevProps, prevState) {
		const codex = this.props.codices.current;
		if (codex.pid == "") return;
		const url = `${facsimileUrl}${codex.pid}.jpg`;

		const img = React.findDOMNode(this.refs.facsimile);

		const onError = () => {
			img.src = "/images/placeholder.svg"
			img.removeEventListener("error", onError);
		};

		img.addEventListener("error", onError);
		img.src = url;
	}

	handleTabChange(label) {
		const codex = this.props.codices.current;

		browserHistory.push(`/codex/${codex.pid}/${label.toLowerCase()}`);
	}

	render() {
		let codex = this.props.codices.current;

		let tab = (this.props.params.tab != null) ?
			this.props.params.tab :
			"codex";

		const facsimile = <img alt="Facsimile" ref="facsimile"/>;
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
							{(tab === "codex") ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === "text"}
						label="Text">
						{header}
						<div className="codex-record-body">
							<TextUnit {...this.props}/>
							{(tab === "text") ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === "margin"}
						label="Margin">
						{header}
						<div className="codex-record-body">
							<MarginUnit {...this.props}/>
							{(tab === "margin") ? facsimile : null}
						</div>
					</Tab>
					<Tab
						active={tab === "persons & places"}
						label="Persons & Places">
						{header}
						<div className="codex-record-body">
							<PersonsAndPlaces {...this.props}/>
							{(tab === "persons & places") ? facsimile : null}
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
