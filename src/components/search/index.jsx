import React from "react";
import cx from "classnames";
import R from "ramda";

import FacetedSearch from "hire-faceted-search";

import Filters from "./filters";
import Result from "./result";

import config from "../../config";

class Search extends React.Component {
	shouldComponentUpdate(nextProps) {
		return false;
	}

	render() {
		return (
			<FacetedSearch
				config={{
					baseURL: config.baseUrl,
					searchPath: "search",
					headers: {
						VRE_ID: "WomenWriters",
						Accept: "application/json"
					}
				}}
				customComponents={{
					filters: Filters,
					result: Result
				}}
				facetSortMap={{
					"facet_s_codex_top_marginfill_pct": {
						type: "alphabet",
						direction: "ascending"
					},
					"facet_s_codex_pct_blank_pages": {
						type: "alphabet",
						direction: "ascending"
					},
					"facet_s_codex_pct_annotated_pages": {
						type: "alphabet",
						direction: "ascending"
					},
					"facet_s_codex_marginal_space": {
						type: "alphabet",
						direction: "ascending"
					}
				}}
				fullTextSearch={false}
				labels={{
					facetTitles: {
						facet_s_codex_place_of_preservation: "Codex - Place of Preservation",
						facet_s_codex_origin_region: "Codex - Origin (Region)",
						facet_s_codex_origin_place: "Codex - Origin (Place)",
						facet_s_codex_origin_scriptorium: "Codex - Origin (Scriptorium)",
						facet_s_codex_provenance_region: "Codex - Provenance (Region)",
						facet_s_codex_provenance_place: "Codex - Provenance (Place)",
						facet_s_codex_provenance_scriptorium: "Codex - Provenance (Scriptorium)",
						facet_s_codex_marginal_space: "Codex - Marginal space %",
						facet_s_codex_script_type: "Codex - Script",
						facet_s_codex_pct_annotated_pages: "Codex - Annotated pages %",
						facet_s_codex_pct_blank_pages: "Codex - Blank pages %",
						facet_s_codex_top_marginfill_pct: "Codex - Most filled pages %",
						date_range: "Codex - Date",
						facet_s_text_title: "Text - Title",
						facet_s_text_author: "Text - Author",
						facet_s_text_period: "Text - Period",
						facet_s_text_type: "Text - Genre",
						facet_s_marg_typology: "Margin - Type",
						facet_s_margin_phenomenon: "Margin - Specific phenomena",
						margin_date_range: "Margin - Date",
						facet_s_margin_language: "Margin - Language",
						facet_s_margin_script_type: "Margin - Script type",
						facet_s_margin_origin_region: "Margin - Origin (Region)",
						facet_s_margin_origin_place: "Margin - Origin (Place)",
						facet_s_margin_origin_scriptorium: "Margin - Origin (Scriptorium)",
						facet_s_person_name: "Persons/places - Persons",
						facet_s_person_role: "Persons/places - Role",
						facet_s_place_region: "Persons/places - Region",
						facet_s_place_place: "Persons/places - Place",
						facet_s_place_scriptorium: "Persons/places - Scriptorium"
					}
				}}
				onChange={this.props.onResultChange}
				onSelect={this.props.onResultSelect}
				query={R.last(this.props.search.queries)}
				result={R.last(this.props.search.results)}
			/>
		);
	}
}

Search.propTypes = {
	onResultChange: React.PropTypes.func,
	onResultSelect: React.PropTypes.func,
	search: React.PropTypes.object
};

export default Search;