React = require 'react'
extend = require "extend"

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
	width: "100%"

inlineBlockStyle =
	display: "inline-block"
	boxSizing: "border-box"
	verticalAlign: "top"

# inputStyle = extend inputStyle, inlineBlockStyle
# buttonStyle = extend buttonStyle, inlineBlockStyle


ListItem = React.createClass
	getInitialState: ->
		newValue: @props.value 

	defaultProps: ->
		editing: "false"
		value: ""

	propTypes:
		editing: React.PropTypes.bool
		value: React.PropTypes.string
		onClick: React.PropTypes.func
		onCancel: React.PropTypes.func
		onChange: React.PropTypes.func
		onRemove: React.PropTypes.func
	
	componentWillUpdate: (nextProps, nextState) ->
		console.log "wu"
		unless nextProps.editing
			nextState.newValue = nextProps.value

	componentDidUpdate: (prevPros, prevState) ->
		if @props.editing
			node = React.findDOMNode(@refs.input)
			node.focus()
			node.value = node.value

	render: ->
		className = "list-item"
		className += " edit" if @props.editing

		if @props.editing
			input =
				<input
					style={ext(
						inlineBlockStyle,
						inputStyle
					)}
					ref="input"
					onChange={@_onChange}
					onKeyDown={@_onKeyDown}
					value={@state.newValue} />
			remove =
				<button
					style={ext(
						inlineBlockStyle,
						buttonStyle
					)}
					className="remove"
					onClick={@props.onRemove}>x</button>
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

		<li
			style={liStyle}
			className={className}>
			{value}
			{input}
			{remove}
		</li>

	_onChange: (ev) ->
		@setState newValue: ev.target.value

	_onKeyDown: (ev) ->
		# if keyCode is "enter" or "tab"
		if ev.keyCode is 13 or ev.keyCode is 9
			if @state.newValue is @props.value
				@props.onCancel()
			else
				@props.onChange(@state.newValue)

		# if keyCode is "escape"
		if ev.keyCode is 27
			@props.onCancel()

module.exports = ListItem
