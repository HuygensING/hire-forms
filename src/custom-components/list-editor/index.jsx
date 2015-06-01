import React from "react";
import Immutable from "immutable";

import ListFilter from "../../components/list-filter";
import PersonForm from "./forms/person";

class ListEditor extends React.Component {
	handleListFilterChange(value) {
		this.props.onSelect(value);
	}

	render() {
		return (
			<div className="hire-list-editor">
				<ListFilter
					onChange={this.handleListFilterChange.bind(this)}
					options={this.props.values} />
				<PersonForm
					value={this.props.value} />
			</div>
		);
	}
}

ListEditor.defaultProps = {
	value: new Immutable.Map(),
	values: []
};

ListEditor.propTypes = {
	onDelete: React.PropTypes.func,
	onSave: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	value: React.PropTypes.instanceOf(Immutable.Map),
	values: React.PropTypes.array
};


module.exports = ListEditor;