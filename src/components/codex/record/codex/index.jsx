import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Well from '../../../well';
import Text from '../elements/text';
import Locality from '../elements/locality';
import Layout from '../elements/layout';

function CodexUnit({ codex }) {
	const quants = codex.marginalQuantities;
	let annotatedPages = quants.firstPagesWithMarginals / quants.firstPagesConsidered * 100;
	annotatedPages = isNaN(annotatedPages) ? 'na' : `${Math.round(annotatedPages)}%`;
	let blankPages = codex.marginalQuantities.totalBlankPages / codex.folia * 100;
	blankPages = isNaN(blankPages) ? 'na' : `${Math.round(blankPages)}%`;

	return (
		<div className="codex-unit">
			<Well title="Content summary">
				{codex.contentSummary}
			</Well>
			<Well title="Marginal activity summary">
				{codex.marginalsSummary}
			</Well>
			<Well title="Quantities of marginal activity">
				<Text label="Annotated pages %">
					{annotatedPages}
					<small>
						({quants.firstPagesWithMarginals} out of {quants.firstPagesConsidered})
					</small>
				</Text>
				<Text label="Blank pages %">
					{blankPages}
					<small>({quants.totalBlankPages} out of {codex.folia})</small>
				</Text>
				<Text label="Most filled page %">
					{quants.mostFilledPagePctage}%
					<small>({quants.mostFilledPageDesignation})</small>
				</Text>
			</Well>
			<Well title="Date">
				<Text label="Date">{codex.date}</Text>
				<Text label="Source">{codex.dateSource}</Text>
			</Well>
			<Well title="Origin">
				<Locality data={codex.origin} />
			</Well>
			<Well title="Provenance">
				{codex.provenances.map((prov, index) =>
					<Locality data={prov} key={index} />
				)}
			</Well>
			<Well title="Layout">
				<Text label="Measurements">
					{codex.pageDimensionHeight}mm <small>(height)</small>
					<br />
					{codex.pageDimensionWidth}mm <small>(width)</small>
				</Text>
				<Text label="Number of pages">{codex.folia}</Text>
				<Text label="Quire Structure">{codex.quireStructure}</Text>
				<h3>Layouts</h3>
				<ul className="layouts">
					{codex.pageLayouts.map((layout, index) =>
						<Layout
							data={layout}
							key={index}
							pageHeight={codex.pageDimensionHeight}
							pageWidth={codex.pageDimensionWidth}
						/>
					)}
				</ul>
			</Well>
			<Well title="Script">
				<Text
					label="Type"
					remarks={codex.script.typesRemarks}
				>
					{codex.script.types}
				</Text>
				<Text label="Characteristics">{codex.script.characteristics}</Text>
				<Text label="Number of hands">{codex.script.handsCount}</Text>
				<div className="list">
					<label>Scribe</label>
					<ul>{
						codex.script.scribes
							.map((scribe, index) =>
								<li key={index}>
									<span className="name">{scribe.person.value}</span>
									<br />
									<span className="remarks">{scribe.remarks}</span>
								</li>
							)
					}</ul>
				</div>
				<Text label="Scribe remarks">{codex.script.scribeRemarks}</Text>
			</Well>
			<Well title="URL">
				<ul>
					{codex.URLs.map((url, index) =>
						<li key={index}>
							<a href={url} target="_blank">{url}</a>
						</li>
					)}
				</ul>
			</Well>
			<Well title="Bibliography">
				<ul>
					{codex.bibliographies.map((bib, index) =>
						<li key={index}>{bib}</li>
					)}
				</ul>
			</Well>
		</div>
	);
}

CodexUnit.propTypes = {
	codex: PropTypes.object,
};

export default connect(
	state => ({
		codex: state.codices.current,
	})
)(CodexUnit);
