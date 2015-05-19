#TODO use visible state instead of options list

React = require 'react'

Input = require '../input'
Options = require '../options'

divStyle = {
	position: "relative"
}

{AUTOCOMPLETE} = require "../../constants"

class Autocomplete extends React.Component
	@defaultProps =
		options: []
		value: ""
		minLength: 1
	
	@propTypes =
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.string
		minLength: React.PropTypes.number
		options: React.PropTypes.array
		placeholder: React.PropTypes.string
		async: React.PropTypes.func

	constructor: (props) ->
		super props

		@cache = {}
		@state =
			inputValue: props.value
			options: []

	render: ->
		<div
			className={AUTOCOMPLETE}
			style={divStyle}>
			<Input
				ref="input"
				value={@state.inputValue}
				placeholder={@props.placeholder}
				onChange={@_handleInputChange}
				onKeyDown={@_handleInputKeyDown} />
			{@props.children}
			<Options
				ref="options"
				value={@props.value}
				values={@state.options}
				query={@state.inputValue}
				onChange={@_handleOptionsChange} />
		</div>

	_handleInputChange: (inputValue, ev) =>
		# Return empty options if inputValue length is beneath a treshold.
		if inputValue.length < @props.minLength
			return @setState
				inputValue: inputValue
				options: []

		# Return options from cache.
		if @cache.hasOwnProperty(inputValue)
			return @setState
				inputValue: inputValue
				options: @cache[inputValue]

		if @props.async?
			@_fetch inputValue
		else
			@_filter inputValue

	_fetch: do ->
		timer = null

		(inputValue) ->
			@setState
				inputValue: inputValue

			if timer?
				clearTimeout timer

			timer = setTimeout (=>
				timer = null

				@props.async inputValue, (options) =>
					# Add the options to the cache.
					@cache[inputValue] = options

					# Get the cache from the current (!!!) inputValue. The results trail behind
					# the user typing, so we have to pass the options of the current inputValue,
					# not the options of the inputValue of the fetch.
					@setState
						options: @cache[@state.inputValue] ? []
			), 400

	_filter: (inputValue) ->
		@cache[inputValue] = @props.options.filter (value) ->
			value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1

		@setState
			inputValue: inputValue
			options: @cache[inputValue]

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
		@setState
			options: []
			inputValue: value

		@props.onChange value

	###
	# Clear the autocomplete, which means: clear the input and
	# empty the options.
	###
	clear: =>
		@setState
			options: []
			inputValue: ""

	###
	# Toggle all options (props.options).
	#
	# This method is used by the combo(-list) component. Doesn't work in combination
	# with props.async!
	###
	toggleOptions: =>
		React.findDOMNode(@refs.input).focus()

		options = if @state.options.length then [] else @props.options
		@setState
			options: options

module.exports = Autocomplete
