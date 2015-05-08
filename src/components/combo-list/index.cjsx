React = require 'react'

Immutable = require 'immutable'

List = require "../list"
Autocomplete = require "../autocomplete"

class ComboList extends React.Component
	@defaultProps =
		listValues: []
		ordered: false

	@propTypes =
		placeholder: React.PropTypes.string
		listValues: React.PropTypes.array
		autocompleteValues: React.PropTypes.array
		ordered: React.PropTypes.bool
		async: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			listValues: new Immutable.List(props.listValues)

	render: ->
		<div className="hire-combo-list">
			<List
				editable={false}
				values={@state.listValues.toArray()}
				onChange={@_handleEditableListChange} />
			<Autocomplete
				ref="autocomplete"
				placeholder={@props.placeholder}
				values={@props.autocompleteValues}
				async={@props.async}
				onSelect={@_handleAutocompleteSelect} />
		</div>

	# _handleInputKeyDown: (ev) =>
	# 	if ev.keyCode is 13 and @state.inputValue.length > 0
	# 		@setState
	# 			inputValue: ""
	# 			values: @state.values.push(@state.inputValue)

	# _handleInputChange: (ev) =>
	# 	@setState
	# 		inputValue: ev.target.value


	_handleEditableListChange: (values) =>
		@setState
			listValues: new Immutable.List(values)

	_handleAutocompleteSelect: (value) =>
		@setState
			listValues: @state.listValues.push value

		@refs.autocomplete.clear()

module.exports = ComboList
