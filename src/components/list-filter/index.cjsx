#TODO use visible state instead of options list

React = require 'react'

Input = require '../input'
Options = require '../options'

divStyle = {
	position: "relative"
}

{LISTFILTER} = require "../../constants"

class ListFilter extends React.Component
	@defaultProps =
		options: []
		minLength: 0
	
	@propTypes =
		# The onChange should be called onSelect,
		# but onChange keeps it in par with the other components.
		onChange: React.PropTypes.func.isRequired
		minLength: React.PropTypes.number
		options: React.PropTypes.array
		placeholder: React.PropTypes.string
		value: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			query: ""
			options: @props.options

	render: ->
		<div
			className={LISTFILTER}
			style={divStyle}>
			<Input
				ref="input"
				value={@state.query}
				placeholder={@props.placeholder}
				onChange={@_handleInputChange}
				onKeyDown={@_handleInputKeyDown} />
			{@props.children}
			<Options
				ref="options"
				value={@props.value}
				values={@state.options}
				query={@state.query}
				onChange={@_handleOptionsChange} />
		</div>

	_handleInputChange: (inputValue, ev) =>
		# Return empty options if inputValue length is beneath a treshold.
		if inputValue.length < @props.minLength
			return @setState
				inputValue: inputValue
				options: []

		@_filter inputValue

	_filter: (inputValue) ->
		@setState
			query: inputValue
			options: @props.options.filter (value) ->
				value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1

	_handleInputKeyDown: (ev) =>
		# Up
		if ev.keyCode is 38
			@refs.options.highlightPrev()

		# Down
		if ev.keyCode is 40
			@refs.options.highlightNext()

		# Enter
		if ev.keyCode is 13
			@refs.options.select()

		# Escape
		if ev.keyCode is 27
			@clear()

	_handleOptionsChange: (value) =>
		@props.onChange value

module.exports = ListFilter
