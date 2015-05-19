# TODO use combo (not a combolist)

React = require "react"

ListFilter = require "../list-filter"

class ListEditor extends React.Component
	@defaultProps =
		values: []

	@propTypes =
		values: React.PropTypes.array
		onChange: React.PropTypes.func.isRequired
		onDelete: React.PropTypes.func

	render: ->
		<div className="hire-list-editor">
			<ListFilter
				options={@props.values}
				onChange={@_handleComboChange} />
		</div>

	_handleComboChange: (value) =>
		console.log value
		@props.onChange value
		

module.exports = ListEditor