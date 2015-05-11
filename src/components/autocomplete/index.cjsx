React = require 'react'
Immutable = require 'immutable'

Input = require '../input'
Options = require './options'

divStyle = {
	position: "relative"
}

class Autocomplete extends React.Component
	@defaultProps =
		options: new Immutable.List()
		minLength: 1
		onSelect: ->
	
	@propTypes =
		minLength: React.PropTypes.number
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string
		onSelect: React.PropTypes.func
		async: React.PropTypes.func

	constructor: (props) ->
		super props

		@cache = {}
		@state =
			inputValue: ""
			options: new Immutable.List()

	render: ->
		<div
			className="hire-autocomplete"
			style={divStyle}>
			<Input
				value={@state.inputValue}
				placeholder={@props.placeholder}
				onChange={@_handleInputChange}
				onKeyDown={@_handleInputKeyDown} />
			<Options
				ref="options"
				values={@state.options}
				onSelect={@_handleOptionSelect} />
		</div>

	_handleInputChange: (inputValue, ev) =>
		# Return empty options if inputValue length is beneath a treshold.
		if inputValue.length < @props.minLength
			return @setState
				inputValue: inputValue
				options: new Immutable.List()

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
						options: @cache[@state.inputValue] ? new Immutable.List()
			), 400

	_filter: (inputValue) ->
		inputValue = inputValue.toLowerCase()

		@cache[inputValue] = @props.options.filter (value) ->
			value = value.toLowerCase()
			value.indexOf(inputValue) > -1

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

	_handleOptionSelect: (value) =>
		@setState
			options: new Immutable.List()
			inputValue: value

		@props.onSelect value

	clear: =>
		@setState
			options: new Immutable.List()
			inputValue: ""


module.exports = Autocomplete
