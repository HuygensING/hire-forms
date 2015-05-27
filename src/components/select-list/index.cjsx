React = require 'react'

Immutable = require 'immutable'

StaticList = require "../static-list"
Select = require "../select"

{SELECTLIST} = require "../../constants"

class SelectList extends React.Component
	@defaultProps =
		values: []
		options: []
		ordered: false

	@propTypes =
		placeholder: React.PropTypes.string
		values: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.arrayOf(
				React.PropTypes.shape(
					key: React.PropTypes.string
					value: React.PropTypes.string
				)
			)
		])
		options: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.arrayOf(
				React.PropTypes.shape(
					key: React.PropTypes.string
					value: React.PropTypes.string
				)
			)
		])
		ordered: React.PropTypes.bool
		async: React.PropTypes.func
		onChange: React.PropTypes.func.isRequired

	render: ->
		<div className={SELECTLIST}>
			<StaticList
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
		@props.values.push(value)

		@props.onChange @props.values

	_isListOfStrings: (list) ->
		list.length and (typeof list[0] is "string")

module.exports = SelectList
