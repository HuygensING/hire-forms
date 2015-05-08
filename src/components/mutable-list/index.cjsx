React = require 'react'

Immutable = require 'immutable'

List = require "../list"
Input = require "../input"

class MutableList extends React.Component
	@defaultProps =
		values: []
		ordered: false

	@propTypes =
		values: React.PropTypes.array
		ordered: React.PropTypes.bool
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			values: new Immutable.List(props.values)
			inputValue: ""

	render: ->
		<div className="hire-mutable-list">
			<List
				ordered={@props.ordered}
				values={@state.values.toArray()}
				onChange={@_handleEditableListChange} />
			<Input
				placeholder={@props.placeholder}
				value={@state.inputValue}
				onKeyDown={@_handleInputKeyDown}
				onChange={@_handleInputChange} />
		</div>

	_handleInputKeyDown: (ev) =>
		if ev.keyCode is 13 and @state.inputValue.length > 0
			@setState
				inputValue: ""
				values: @state.values.push(@state.inputValue)

	_handleInputChange: (ev) =>
		@setState
			inputValue: ev.target.value

	_handleEditableListChange: (values) =>
		@setState
			values: new Immutable.List(values)


module.exports = MutableList
