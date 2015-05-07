React = require 'react'

Immutable = require 'immutable'

Input = require '../input'
Options = require './options'

class Autocomplete extends React.Component
	@defaultProps =
		values: []
		minLength: 1
	
	@propTypes =
		minLength: React.PropTypes.number
		values: React.PropTypes.array
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@cache = {}
		@state =
			options: Immutable.List()

	render: ->
		<div className="hire-autocomplete">
			<Input 
				placeholder={@props.placeholder}
				onChange={@_handleInputChange} />
			<Options values={@state.options} />
		</div>

	_handleInputChange: (inputValue) =>
		# Return empty options if inputValue length is beneath a treshold.
		if inputValue.length < @props.minLength
			return @setState options: Immutable.List()

		# Add value and filtered result to cache.
		unless @cache.hasOwnProperty(inputValue)
			filtered = @props.values.filter (value) ->
				value.indexOf(inputValue) > -1

			@cache[inputValue] = filtered

		# Set the state to the filtered list from cache.
		@setState options: @cache[inputValue]

module.exports = Autocomplete
