React = require 'react'
cx = require "classnames"

{INPUT} = require "../../constants"

class Input extends React.Component
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

	constructor: (props) ->
		super props

		@state =
			focus: false

	shouldComponentUpdate: (nextProps, nextState) ->
		stateChange = @state isnt nextState
		propsChange = @props.value isnt nextProps.value

		stateChange or propsChange
	
	render: ->
		<input 
			className={cx(
				INPUT,
				focus: @state.focus
			)}
			style={@props.style}
			value={@props.value}
			placeholder={@props.placeholder}
			onKeyDown={@_handleKeyDown}
			onKeyUp={@_handleKeyUp}
			onChange={@_handleChange}
			onBlur={@_toggleFocus}
			onFocus={@_toggleFocus} />

	_toggleFocus: =>
		@setState
			focus: not @state.focus

	_handleKeyDown: (ev) =>
		@props.onKeyDown ev

	_handleKeyUp: (ev) =>
		@props.onKeyUp ev

	_handleChange: (ev) =>
		@props.onChange ev.currentTarget.value, ev

module.exports = Input
