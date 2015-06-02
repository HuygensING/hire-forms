import React from "react";
import Immutable from "immutable";

import ListFilter from "../../components/list-filter";
import PersonForm from "./forms/person";
import TextForm from "./forms/text";

class ListEditor extends React.Component {
	handleListFilterChange(value) {
		this.props.onSelect(value);
	}

	render() {
		let form = (this.props.type === "person") ?
			(<PersonForm
				value={this.props.value} />) :
			(<TextForm
				value={this.props.value} />);

		return (
			<div className="hire-list-editor">
				<ListFilter
					onChange={this.handleListFilterChange.bind(this)}
					options={this.props.values} />
				{form}
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
	type: React.PropTypes.oneOf(["person", "text"]).isRequired,
	value: React.PropTypes.instanceOf(Immutable.Map),
	values: React.PropTypes.array
};


module.exports = ListEditor;