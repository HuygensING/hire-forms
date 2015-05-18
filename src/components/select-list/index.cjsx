React = require 'react'

Immutable = require 'immutable'

List = require "../list"
Select = require "../select"

{SELECTLIST} = require "../../constants"

class SelectList extends React.Component
	@defaultProps =
		values: new Immutable.List()
		options: new Immutable.List()
		ordered: false

	@propTypes =
		placeholder: React.PropTypes.string
		values: React.PropTypes.instanceOf(Immutable.List)
		options: React.PropTypes.instanceOf(Immutable.List)
		ordered: React.PropTypes.bool
		async: React.PropTypes.func
		onChange: React.PropTypes.func.isRequired

	render: ->
		options = @props.options.filter (option) =>
			not @props.values.contains(option)

		<div className={SELECTLIST}>
			<List
				editable={false}
				values={@props.values}
				onChange={@_handleListChange} />
			<Select
				placeholder={@props.placeholder}
				options={options}
				onChange={@_handleSelectChange} />
		</div>

	_handleListChange: (values) =>
		@props.onChange values

	_handleSelectChange: (value) =>
		@props.onChange @props.values.push(value)

module.exports = SelectList
