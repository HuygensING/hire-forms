React = require 'react'

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

	shouldComponentUpdate: (nextProps, nextState) ->
		@props.value isnt nextProps.value
	
	render: ->
		<textarea
			className="hire-textarea"
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

module.exports = Textarea
