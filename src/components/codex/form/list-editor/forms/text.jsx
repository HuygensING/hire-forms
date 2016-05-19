import React, { PropTypes } from 'react';
import Input from 'hire-forms-input';
import Select from 'hire-forms-select';
import SelectList from 'hire-forms-select-list';

const TextForm = (props) =>
	<ul className="texts-form">
		<li>
			<label>Title</label>
			<Input
				onChange={props.onChange.bind(this, 'title')}
				value={props.model.title}
			/>
		</li>
		<li>
			<label>Authors</label>
			<SelectList
				onChange={props.onChange.bind(this, 'authors')}
				options={props.persons}
				values={props.model.authors}
			/>
		</li>
		<li>
			<label>Period</label>
			<Select
				onChange={props.onChange.bind(this, 'period')}
				options={props.facetData.facet_s_text_period}
				value={props.model.period}
			/>
		</li>
		<li>
			<label>Genre</label>
			<SelectList
				onChange={props.onChange.bind(this, 'contentTypes')}
				options={props.facetData.facet_s_text_type}
				values={props.model.contentTypes}
			/>
		</li>
	</ul>

TextForm.propTypes = {
	facetData: PropTypes.object,
	model: PropTypes.object,
	onChange: PropTypes.func,
	persons: PropTypes.array,
};

export default TextForm;
