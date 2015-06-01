// TODO Fix filter options (remove values from options). Doesn't work, because AutoComplete has a cache for the async.
import React from "react";
import Immutable from "immutable";

import List from "../list";
import Autocomplete from "../autocomplete";

import {AUTOCOMPLETELIST} from "../../constants";

class AutocompleteList extends React.Component {
	handleEditableListChange(values) {
		this.props.onChange(values);
	}

	handleAutocompleteChange(value) {
		this.props.values.push(value);
		this.props.onChange(this.props.values);

		this.refs.autocomplete.clear();
	}

	render() {
		let options = this.props.options.filter((option) => {
			return !this.props.values.contains(option);
		});

		return (
			<div className={AUTOCOMPLETELIST}>
				<List
					editable={false}
					onChange={this.handleEditableListChange.bind(this)}
					values={this.props.values} />
				<Autocomplete
					async={this.props.async}
					onChange={this.handleAutocompleteChange.bind(this)}
					options={options}
					placeholder={this.props.placeholder}
					ref="autocomplete" />
			</div>
		);
	}
}

AutocompleteList.defaultProps = {
	options: new Immutable.List(),
	ordered: false,
	values: new Immutable.List()
};
AutocompleteList.propTypes = {
	async: React.PropTypes.func,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.array,
	ordered: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	values: React.PropTypes.array
};

export default AutocompleteList;