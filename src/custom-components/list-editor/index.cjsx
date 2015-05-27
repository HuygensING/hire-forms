React = require "react"
Immutable = require "immutable"

ListFilter = require "../../components/list-filter"

PersonForm = require "./forms/person"

class ListEditor extends React.Component
	@defaultProps =
		value: new Immutable.Map()
		values: []

	@propTypes =
		value: React.PropTypes.instanceOf(Immutable.Map)
		values: React.PropTypes.array
		onSelect: React.PropTypes.func
		onSave: React.PropTypes.func
		onDelete: React.PropTypes.func

	render: ->
		<div className="hire-list-editor">
			<ListFilter
				options={@props.values}
				onChange={@_handleListFilterChange} />
			<PersonForm
				value={@props.value} />
		</div>

	_handleListFilterChange: (value) =>
		@props.onSelect value
		

module.exports = ListEditor