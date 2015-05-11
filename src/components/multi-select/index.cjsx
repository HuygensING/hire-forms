React = require 'react'
Immutable = require "immutable"

Checkbox = require "../checkbox"

class MultiSelect extends React.Component
	@defaultProps =
		values: new Immutable.List()
		options: new Immutable.List()

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.instanceOf(Immutable.List)
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string

	render: ->
		options = @props.options.map (option, index) =>
			<Checkbox
				key={index}
				value={@props.values.contains(option)}
				label={option}
				onChange={@_handleChange.bind(@, index)} />

		<ul className="hire-multi-select">
			{options}
		</ul>

	_handleChange: (index, checked) =>
		option = @props.options.get(index)

		if checked
			@props.onChange @props.values.push(option)
		else
			valueIndex = @props.values.indexOf(option)
			@props.onChange @props.values.delete valueIndex

module.exports = MultiSelect
