React = require 'react'

Immutable = require 'immutable'

List = require "../list"
Select = require "../select"

{SELECTLIST} = require "../../constants"

class SelectList extends React.Component
	@defaultProps =
		values: []
		options: []
		ordered: false

	@propTypes =
		placeholder: React.PropTypes.string
		values: React.PropTypes.array
		options: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
		ordered: React.PropTypes.bool
		async: React.PropTypes.func
		onChange: React.PropTypes.func.isRequired

	render: ->
		# Remove selected values from options
		# options = @props.options.filter (option) =>
		# 	@props.values.indexOf(option) is -1

		<div className={SELECTLIST}>
			<List
				editable={false}
				values={@props.values}
				onChange={@_handleListChange} />
			<Select
				placeholder={@props.placeholder}
				options={@props.options}
				onChange={@_handleSelectChange} />
		</div>

	_handleListChange: (values) =>
		@props.onChange values

	_handleSelectChange: (value) =>
		@props.onChange @props.values.push(value)

module.exports = SelectList
