import React, { Component, PropTypes } from 'react';
import ListFilter from 'hire-forms-list-filter';
import Form from './forms';

class ListEditor extends Component {
	state = {
		value: {
			key: '',
			value: '',
		},
	};

	handleListFilterChange(value) {
		this.setState({ value });
	}

	render() {
		return (
			<div className="hire-list-editor">
				<ListFilter
					onChange={this.handleListFilterChange.bind(this)}
					options={this.props.type === 'text' ? this.props.texts : this.props.persons}
					value={this.state.value}
				/>
				<Form
					{...this.props}
					value={this.state.value}
				/>
			</div>
		);
	}
}

ListEditor.propTypes = {
	persons: PropTypes.array,
	texts: PropTypes.array,
	type: PropTypes.oneOf(['person', 'text']).isRequired,
};


module.exports = ListEditor;
