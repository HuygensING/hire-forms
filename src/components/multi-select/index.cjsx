React = require 'react'
Immutable = require "immutable"

Checkbox = require "../checkbox"

{MULTISELECT} = require "../../constants"

class MultiSelect extends React.Component
	@defaultProps =
		values: []
		options: []

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.array
		options: React.PropTypes.array
		placeholder: React.PropTypes.string

	render: ->
		options = @props.options.map (option, index) =>
			<Checkbox
				key={index}
				value={@props.values.indexOf(option) > -1}
				label={option}
				onChange={@_handleChange.bind(@, index)} />

		<div className={MULTISELECT}>
			{options}
		</div>

	_handleChange: (index, checked) =>
		option = @props.options.get(index)

		if checked
			@props.values.push(option)
			@props.onChange @props.values
		else
			valueIndex = @props.values.indexOf(option)
			@props.values.splice valueIndex, 1
			@props.onChange @props.values

module.exports = MultiSelect
