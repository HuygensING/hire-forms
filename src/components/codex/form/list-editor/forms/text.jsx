import React, { Component, PropTypes } from 'react';
import Input from 'hire-forms-input';
import Select from 'hire-forms-select';
import SelectList from 'hire-forms-select-list';

class TextForm extends Component {
	// handleAuthorsChange(authors) {
	// 	authors = authors.map((author) => {
	// 		author["^person"] = author.key.split("/").slice(-2).join("/");
	//
	// 		return author;
	// 	});
	// 	this.props.onChange('authors', authors);
	// }

	render() {
		console.log(this.props.model)
		return (
			<ul className="texts-form">
				<li>
					<label>Title</label>
					<Input
						onChange={this.props.onChange.bind(this, "title")}
						value={this.props.model.title}
					/>
				</li>
				<li>
					<label>Authors</label>
					<SelectList
						onChange={this.props.onChange.bind(this, 'authors')}
						options={this.props.persons}
						values={this.props.model.authors}
					/>
				</li>
				<li>
					<label>Period</label>
					<Select
						onChange={this.props.onChange.bind(this, "period")}
						options={this.props.facetData.facet_s_text_period}
						value={this.props.model.period}
					/>
				</li>
				<li>
					<label>Genre</label>
					<SelectList
						onChange={this.props.onChange.bind(this, "contentTypes")}
						options={this.props.facetData.facet_s_text_type}
						values={this.props.model.contentTypes}
					/>
				</li>
			</ul>
		);
	}
}

TextForm.propTypes = {
	facetData: PropTypes.object,
	model: PropTypes.object,
	onChange: PropTypes.func,
	persons: PropTypes.array,
};

export default TextForm;
