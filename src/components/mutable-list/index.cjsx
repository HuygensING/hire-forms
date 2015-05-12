React = require 'react'
Immutable = require "immutable"

List = require "../list"
Input = require "../input"

{MUTABLELIST} = require "../../constants"

class MutableList extends React.Component
	@defaultProps =
		values: new Immutable.List()
		ordered: false

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.instanceOf(Immutable.List)
		ordered: React.PropTypes.bool
		editable: React.PropTypes.bool
		removable: React.PropTypes.bool
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			inputValue: ""

	shouldComponentUpdate: (nextProps, nextState) ->
		propsValuesChange = @props.values isnt nextProps.values
		stateInputValueChange = @state.inputValue isnt nextState.inputValue

		propsValuesChange or stateInputValueChange

	render: ->
		<div className={MUTABLELIST}>
			<List
				ordered={@props.ordered}
				editable={@props.editable}
				removable={@props.removable}
				values={@props.values}
				onChange={@_handleChange} />
			<Input
				placeholder={@props.placeholder}
				value={@state.inputValue}
				onKeyDown={@_handleInputKeyDown}
				onChange={@_handleInputChange} />
		</div>

	_handleInputChange: (value, ev) =>
		@setState
			inputValue: value

	_handleInputKeyDown: (ev) =>
		if ev.keyCode is 13 and @state.inputValue.length > 0
			@_handleChange @props.values.push(@state.inputValue)

			@setState
				inputValue: ""

	_handleChange: (values) =>
		@props.onChange values



module.exports = MutableList
