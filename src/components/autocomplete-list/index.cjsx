#TODO Fix filter options (remove values from options). Doesn't work, because AutoComplete has a cache for the async.
React = require 'react'

Immutable = require 'immutable'

List = require "../list"
Autocomplete = require "../autocomplete"

{AUTOCOMPLETELIST} = require "../../constants"

class AutocompleteList extends React.Component
	@defaultProps =
		values: new Immutable.List()
		options: new Immutable.List()
		ordered: false

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.instanceOf(Immutable.List)
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string
		ordered: React.PropTypes.bool
		async: React.PropTypes.func

	render: ->
		options = @props.options.filter (option) =>
			not @props.values.contains(option)

		<div className={AUTOCOMPLETELIST}>
			<List
				editable={false}
				values={@props.values}
				onChange={@_handleEditableListChange} />
			<Autocomplete
				ref="autocomplete"
				placeholder={@props.placeholder}
				options={options}
				async={@props.async}
				onChange={@_handleAutocompleteChange} />
		</div>

	_handleEditableListChange: (values) =>
		@props.onChange values

	_handleAutocompleteChange: (value) =>
		@props.onChange @props.values.push(value)

		@refs.autocomplete.clear()

module.exports = AutocompleteList
