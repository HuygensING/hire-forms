React = require 'react'
Immutable = require 'immutable'

{MULTIFORM} = require "../constants"

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
		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]

		views = @props.value.map (listItem, index) =>
			<li key={index}>
				<@props.view
					attr={attr.concat(index)}
					value={listItem}
					onChange={@_handleElementChange} />
				<button
					className="hire-remove-form"
					onClick={@_handleRemove.bind(@, index)}>
					-
				</button>
			</li>

		<div className={MULTIFORM}>
			<ul>{views}</ul>
			<button 
				className="hire-add-form"
				onClick={@_handleAdd}>
				+
			</button>
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

	_handleElementChange: (key, value) =>
		@props.onChange key, value

module.exports = MultiForm

