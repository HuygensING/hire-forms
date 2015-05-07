React = require 'react'

inputStyle =
	width: "100%"

class Input extends React.Component
	@defaultProps =
		value: ""
		onChange: ->
	
	@propTypes =
		value: React.PropTypes.string
		placeholder: React.PropTypes.string
		onChange: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			value: props.value

	render: ->
		<input 
			className="hire-input"
			style={inputStyle}
			value={@state.value}
			placeholder={@props.placeholder}
			# onKeyDown={@_handleKeyDown}
			onChange={@_handleChange} />

	# _handleKeyDown: (ev) ->
	# 	if ev.keyCode is 13 and @state.inputValue.length > 0
	# 		@setState
	# 			value: ""
	# 			listItems: @state.listItems.push(@state.inputValue)

	_handleChange: (ev) =>
		if @state.value isnt ev.target.value
			@props.onChange(ev.target.value)
			@setState value: ev.target.value

module.exports = Input
