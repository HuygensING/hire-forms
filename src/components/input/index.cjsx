React = require 'react'

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

	shouldComponentUpdate: (nextProps, nextState) ->
		@props.value isnt nextProps.value
	
	render: ->
		<input 
			className="hire-input"
			style={@props.style}
			value={@props.value}
			placeholder={@props.placeholder}
			onKeyDown={@_handleKeyDown}
			onKeyUp={@_handleKeyUp}
			onChange={@_handleChange} />

	_handleKeyDown: (ev) =>
		@props.onKeyDown ev

	_handleKeyUp: (ev) =>
		@props.onKeyUp ev

	_handleChange: (ev) =>
		@props.onChange ev.currentTarget.value, ev

module.exports = Input
