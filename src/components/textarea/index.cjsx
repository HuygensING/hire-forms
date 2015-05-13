#TODO add autoresize

React = require 'react'
cx = require "classnames"

{TEXTAREA} = require "../../constants"

class Textarea extends React.Component
	@defaultProps =
		value: ""
		onChange: ->
		onKeyDown: ->
		onKeyUp: ->
	
	@propTypes =
		value: React.PropTypes.string
		placeholder: React.PropTypes.string
		onChange: React.PropTypes.func
		onKeyDown: React.PropTypes.func
		onKeyUp: React.PropTypes.func
		style: React.PropTypes.object

	constructor: (props) ->
		super props

		@state =
			focus: false

	shouldComponentUpdate: (nextProps, nextState) ->
		stateChange = @state isnt nextState
		propsChange = @props.value isnt nextProps.value

		stateChange or propsChange
	
	render: ->
		<textarea
			className={cx(
				TEXTAREA,
				focus: @state.focus
			)}
			style={@props.style}
			value={@props.value}
			placeholder={@props.placeholder}
			onKeyDown={@_handleKeyDown}
			onKeyUp={@_handleKeyUp}
			onChange={@_handleChange}
			onFocus={@_toggleFocus}
			onBlur = {@_toggleFocus} />

	_toggleFocus: =>
		@setState
			focus: not @state.focus

	_handleKeyDown: (ev) =>
		@props.onKeyDown ev

	_handleKeyUp: (ev) =>
		@props.onKeyUp ev

	_handleChange: (ev) =>
		@props.onChange ev.currentTarget.value, ev

module.exports = Textarea
