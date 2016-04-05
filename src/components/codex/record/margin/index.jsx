import React from "react";
import {Tabs, Tab} from "hire-tabs";

import Well from "../../../well";
import Text from "../elements/text";
import Locality from "../elements/locality";
import Type from "./type";

let renderTab = (currentTab) => (marginUnit, i) =>
	<Tab
		active={currentTab === `Margin unit ${i + 1}`}
		key={i}
		label={`Margin unit ${i + 1}`}>
		<Well>
			<Text label="Date">{marginUnit.date}</Text>
			<Text label="Relative date">{marginUnit.relativeDate}</Text>
			<Locality data={marginUnit.origin}/>
			<Text label="Languages">{marginUnit.languages}</Text>
			{/*<Text label="Scripts">{marginUnit.scripts}</Text>*/}
			<Text label="Script type">{marginUnit.scriptTypes.join(", ")}</Text>
			<Text label="Number of hands">{marginUnit.handCount}</Text>
			<div className="list">
				<label>Annotator</label>
				<ul>{
					marginUnit.annotators
						.map((annotator, index) =>
							<li key={index}>
								<span className="name">{annotator.person.value}</span>
								<br/>
								<span className="remarks">{annotator.remarks}</span>
							</li>
						)
				}</ul>
			</div>
			<Text label="Remarks">{marginUnit.scriptRemarks}</Text>
		</Well>
		<Well title="Annotation types">
			{marginUnit.marginTypes.map((marginType, index) =>
				<Type
					className="annotation-type"
					data={marginType}
					key={index}/>
			)}
		</Well>
		<Well title="Annotation type remarks">
			{marginUnit.typologyRemarks}
		</Well>
		<Well title="Specific phenomena">
			{marginUnit.specificPhenomena.map((specificPhenomenon, index) =>
				<Type
					className="specific-phenomenon"
					data={specificPhenomenon}
					key={index}/>
			)}
		</Well>
		<Well title="General remarks on function and form">
			{marginUnit.generalObservations}
		</Well>
	</Tab>

class MarginUnit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: "Margin unit 1"
		};
	}

	render() {
		let codex = this.props.codices.current;
		return (codex.marginUnits.length === 0) ?
			<span className="empty">No margin units found</span> :
			<Tabs
				className="sub-menu"
				onChange={(name) => this.setState({tab: name})}>
				{codex.marginUnits.map(renderTab(this.state.tab))}
			</Tabs>
	}
}

export default MarginUnit;
