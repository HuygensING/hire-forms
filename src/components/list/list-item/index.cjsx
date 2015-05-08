React = require 'react'
extend = require "extend"

Input = require "../../input"

ext = ->
	styles = {}
	for arg in arguments
		extend styles, arg
	styles

liStyle =
	cursor: "pointer"

inputStyle =
	width: "90%"

buttonStyle =
	width: "10%"

spanStyle =
	width: "90%"

inlineBlockStyle =
	display: "inline-block"
	boxSizing: "border-box"
	verticalAlign: "top"

class ListItem extends React.Component
	@defaultProps =
		active: false
		editable: false
		removable: true
		value: ""
		onClick: ->
		onCancel: ->
		onChange: ->
		onRemove: ->

	@propTypes =
		active: React.PropTypes.bool
		editable: React.PropTypes.bool
		removable: React.PropTypes.bool
		value: React.PropTypes.string
		onClick: React.PropTypes.func
		onCancel: React.PropTypes.func
		onChange: React.PropTypes.func
		onRemove: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			value: props.value 
	
	componentWillUpdate: (nextProps, nextState) ->
		unless nextProps.active
			nextState.value = nextProps.value

	componentDidUpdate: (prevPros, prevState) ->
		if @props.active and @props.editable
			node = React.findDOMNode(@refs.input)
			node.focus()
			node.value = node.value

	render: ->
		className = "list-item"
		className += " active" if @props.active

		if @props.active and @props.editable
			input =
				<Input
					style={ext(
						inlineBlockStyle,
						inputStyle
					)}
					ref="input"
					onChange={@_onChange}
					onKeyDown={@_onKeyDown}
					value={@state.value} />
		else
			value =
				<span
					style={ext(
						inlineBlockStyle,
						spanStyle
					)}
					onClick={@props.onClick}
					className="value">
					{@props.value}
				</span>

		if @props.active and @props.removable
			remove =
				<button
					style={ext(
						inlineBlockStyle,
						buttonStyle
					)}
					className="remove"
					onClick={@props.onRemove}>x</button>
					

		<li
			style={liStyle}
			className={className}>
			{value}
			{input}
			{remove}
		</li>

	_onChange: (ev) =>
		console.log 'herefd'
		@setState value: ev.target.value

	_onKeyDown: (ev) =>
		# if keyCode is "enter" or "tab"
		if ev.keyCode is 13 or ev.keyCode is 9
			if @state.value is @props.value
				@props.onCancel()
			else
				@props.onChange(@state.value)

		# if keyCode is "escape"
		if ev.keyCode is 27
			@props.onCancel()

module.exports = ListItem
