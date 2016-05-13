import React from 'react';
import { facetMap } from 'hire-faceted-search';
import { Tabs, Tab } from 'hire-tabs';

const codexFacetsList = [
	'facet_s_codex_place_of_preservation',
	'date_range',
	'facet_s_codex_origin_region',
	'facet_s_codex_origin_place',
	'facet_s_codex_origin_scriptorium',
	'facet_s_codex_provenance_region',
	'facet_s_codex_provenance_place',
	'facet_s_codex_provenance_scriptorium',
	'facet_s_codex_marginal_space',
	'facet_s_codex_script_type',
	'facet_s_codex_pct_annotated_pages',
	'facet_s_codex_pct_blank_pages',
	'facet_s_codex_top_marginfill_pct',
];

const textFacetsList = [
	'facet_s_text_author',
	'facet_s_text_title',
	'facet_s_text_state',
	'facet_s_text_period',
	'facet_s_text_type',
];

const marginFacetsList = [
	'facet_s_marg_typology',
	'facet_s_margin_phenomenon',
	'margin_date_range',
	'facet_s_margin_language',
	'facet_s_margin_script_type',
	'facet_s_margin_origin_region',
	'facet_s_margin_origin_place',
	'facet_s_margin_origin_scriptorium',
];

const otherFacetsList = [
	'facet_s_person_name',
	'facet_s_person_role',
	'facet_s_place_region',
	'facet_s_place_place',
	'facet_s_place_scriptorium',
];

class Filters extends React.Component {
	state = {
		tab: 'Codex',
	}

	createFacetList(list) {
		const toFacet = (facetName) => {
			const found = this.props.results.last.facets.filter((facet) =>
				facet.name === facetName
			);

			return (found.length) ? found[0] : null;
		};

		const notNull = (facetName) =>
			facetName !== null;

		const toComponent = (data, index) =>
			facetMap[data.type](data, this.props, index);

		let facetList = list
			.map(toFacet)
			.filter(notNull)
			.map(toComponent);

		return (<ul>{facetList}</ul>);
	}

	render() {
		return (
			<div className="hire-faceted-search-filters">
				<button onClick={this.props.onNewSearch}>New search</button>
				<Tabs onChange={(tab) => this.setState({ tab })}>
					<Tab
						active={this.state.tab === 'Codex'}
						label="Codex"
					>
						{this.createFacetList(codexFacetsList)}
					</Tab>
					<Tab
						active={this.state.tab === 'Text'}
						label="Text"
					>
						{this.createFacetList(textFacetsList)}
					</Tab>
					<Tab
						active={this.state.tab === 'Margin'}
						label="Margin"
					>
						{this.createFacetList(marginFacetsList)}
					</Tab>
					<Tab
						active={this.state.tab === 'Persons & places'}
						label="Persons & places"
					>
						{this.createFacetList(otherFacetsList)}
					</Tab>
				</Tabs>
			</div>
		);
	}
}

Filters.propTypes = {
	onNewSearch: React.PropTypes.func,
	results: React.PropTypes.object,
};

export default Filters;
