// TODO Fix filter options (remove values from options). Doesn't work, because AutoComplete has a cache for the async.
React from 'react'

Immutable from 'immutable'

List from "../list"
Autocomplete from "../autocomplete"

{AUTOCOMPLETELIST} from "../../constants"

class AutocompleteList extends React.Component {
	this.defaultProps =
		values: new Immutable.List()
		options: new Immutable.List()
		ordered: false

	this.propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.instanceOf(Immutable.List)
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string
		ordered: React.PropTypes.bool
		async: React.PropTypes.func

	render() {
		options = this.props.options.filter (option) {
			not this.props.values.contains(option)

		<div className={AUTOCOMPLETELIST}>
			<List
				editable={false}
				values={this.props.values}
				onChange={this._handleEditableListChange} />
			<Autocomplete
				ref="autocomplete"
				placeholder={this.props.placeholder}
				options={options}
				async={this.props.async}
				onChange={this._handleAutocompleteChange} />
		</div>

	_handleEditableListChange)values) {
		this.props.onChange values

	_handleAutocompleteChange)value) {
		this.props.onChange this.props.values.push(value)

		this.refs.autocomplete.clear()

export default AutocompleteList
