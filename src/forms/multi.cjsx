React = require 'react'
Immutable = require 'immutable'

class MultiForm extends React.Component
	@defaultProps =
		value: new Immutable.List()
	
	@propTypes =
		attr: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		]).isRequired
		# view: React.PropTypes.element.isRequired
		value: React.PropTypes.instanceOf(Immutable.List)
		onChange: React.PropTypes.func
		onDelete: React.PropTypes.func

	render: ->
		views = @props.value.map (listItem, index) =>
			<li key={index}>
				<@props.view
					value={listItem}
					onChange={@_handleElementChange.bind(@, index)} />
				<button onClick={@_handleRemove.bind(@, index)}>Remove</button>
			</li>

		<div className="hire-multi-form">
			<ul>{views}</ul>
			<button onClick={@_handleAdd}>Add</button>
		</div>

	_handleAdd: =>
		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]
		index = @props.value.size
		key = attr.concat(index)

		value = new Immutable.Map @props.view.defaultProps

		@props.onChange key, value

	_handleRemove: (index) =>
		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]
		key = attr.concat(index)

		@props.onDelete key

	_handleElementChange: (index, key, value) =>
		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]
		key = attr.concat(index).concat(key)

		@props.onChange key, value

module.exports = MultiForm

