import React from "react";
import cx from "classnames";

import FacetedSearch from "hire-faceted-search";

import Result from "./result";

import config from "../../config";

class Search extends React.Component {
	render() {
		console.log("R");
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
				resultComponent={Result}
				onSelect={this.props.onResultSelect}
			/>
		);
	}
}

Search.propTypes = {
	visible: React.PropTypes.bool
};

export default Search;