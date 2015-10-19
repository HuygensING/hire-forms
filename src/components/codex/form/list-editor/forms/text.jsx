import React from "react";
import Immutable from "immutable";
import R from "ramda";

import Input from "hire-forms-input";
import Select from "hire-forms-select";
import SelectList from "hire-forms-select-list";

class TextForm extends React.Component {
	handleAuthorsChange(authors) {
		authors = authors.map((author) => {
			author["^person"] = author.key.split("/").slice(-2).join("/");

			return author;
		});

		this.props.onChange("authors", authors);
	}

	render() {
		return (
			<ul className="texts-form">
				<li>
					<label>Title</label>
					<Input
						onChange={this.props.onChange.bind(this, "title")}
						value={this.props.model.title} />
				</li>
				<li>
					<label>Authors</label>
					<SelectList
						onChange={this.handleAuthorsChange.bind(this)}
						options={this.props.persons}
						values={this.props.model.authors} />
				</li>
				<li>
					<label>Period</label>
					<Select
						onChange={this.props.onChange.bind(this, "period")}
						options={this.props.search.facetData.facet_s_text_period}
						value={this.props.model.period} />
				</li>
				<li>
					<label>Content types</label>
					<SelectList
						onChange={this.props.onChange.bind(this, "contentTypes")}
						options={this.props.search.facetData.facet_s_text_type}
						values={this.props.model.contentTypes} />
				</li>
			</ul>
		);
	}
}

export default TextForm;