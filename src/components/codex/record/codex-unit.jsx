import React from "react";
import Well from "../../well";
import Text from "./elements/text";
import Locality from "./elements/locality";
import Layout from "./elements/layout";

class CodexUnit extends React.Component {
	render() {
		let codex = this.props.codices.current;

		return (
			<div className="codex-unit">
				<Well title="Date">
					<Text label="Date">{codex.date}</Text>
					<Text label="Source">{codex.dateSource}</Text>
				</Well>
				<Well title="Localisation">
					<h3 className="no-margin">Origin</h3>
					<Locality data={codex.origin}/>
					<h3>Provenances</h3>
					{codex.provenances.map((prov, index) =>
						<Locality data={prov} key={index}/>
					)}
				</Well>
				<Well title="Physical appearance">
					<Text label="Page dimensions">{`${codex.pageDimensionHeight} x ${codex.pageDimensionWidth} mm`}</Text>
					<Text label="Number of pages">{codex.folia}</Text>
					<Text label="Quire Structure">{codex.quireStructure}</Text>
					<h3>Layout(s)</h3>
					{codex.pageLayouts.map((layout, index) =>
						<Layout
							data={layout}
							key={index}
							pageHeight={codex.pageDimensionHeight}
							pageWidth={codex.pageDimensionWidth}/>
					)}
				</Well>
				<Well title="Script">
					<Text label="Type">{codex.script.types}</Text>
					<Text label="Characteristics">{codex.script.characteristics}</Text>
					<Text label="Hand count">{codex.script.handsCount}</Text>
					<Text label="Scribe">{codex.script.scribeRemarks}</Text>
				</Well>
				<Well title="Content description">
					{codex.contentSummary}
				</Well>
				<Well title="Marginal activity summary">
					{codex.marginalsSummary}
				</Well>
				<Well title="Bibliography">
					<ul>
						{codex.bibliographies.map((bib, index) =>
							<li key={index}>{bib}</li>
						)}
					</ul>
				</Well>
				<Well title="URLs">
					<ul>
						{codex.URLs.map((url, index) =>
							<li key={index}>
								<a href={url} target="_blank">{url}</a>
							</li>
						)}
					</ul>
				</Well>
			</div>
		);
	}
}

export default CodexUnit;
