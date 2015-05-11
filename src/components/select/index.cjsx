React = require 'react'
Immutable = require "immutable"

List = require "../list"

class Select extends React.Component
	@defaultProps =
		value: ""
		options: new Immutable.List()

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.string
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			visible: false

	render: ->
		if @state.visible
			list =
				<List
					removable={false}
					ref="autocomplete"
					values=@props.options
					onClick={@_handleListClick} />

		<div className="hire-select">
			<div className="input-container" onClick={@_handleInputClick}>
				<div className="input">{@props.value}</div>
				<button>▾</button>
			</div>
			{list}
		</div>

	_handleInputClick: (ev) =>
		@setState
			visible: !@state.visible

	_handleListClick: (index, ev) =>
		@setState
			visible: false

		@props.onChange @props.options.get(index)

module.exports = Select