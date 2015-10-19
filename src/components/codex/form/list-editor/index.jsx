import React from "react";
import Immutable from "immutable";

import ListFilter from "hire-forms-list-filter";
import Form from "./forms";

class ListEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: {
				key: "",
				value: ""
			}
		};
	}

	handleListFilterChange(value) {
		this.setState({
			value: value
		});
	}

	render() {
		return (
			<div className="hire-list-editor">
				<ListFilter
					onChange={this.handleListFilterChange.bind(this)}
					options={this.props.values}
					value={this.state.value} />
				<Form
					{...this.props}
					type={this.props.type}
					value={this.state.value} />
			</div>
		);
	}
}

ListEditor.defaultProps = {
	values: []
};

ListEditor.propTypes = {
	onDelete: React.PropTypes.func,
	onSave: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	type: React.PropTypes.oneOf(["person", "text"]).isRequired,
	value: React.PropTypes.object,
	values: React.PropTypes.array
};


module.exports = ListEditor;