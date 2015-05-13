React = require 'react'
Immutable = require "immutable"

ulStyle = {
	position: "absolute"
}

liStyle = {
	cursor: "pointer"
}

highlightClass = "highlight"

{OPTIONS} = require "../../constants"

###
# Options are rendered beneath the autocomplete and select components.
#
# @class
###
class options extends React.Component
	@defaultProps =
		values: new Immutable.List()
		onChange: ->
	
	@propTypes =
		values: React.PropTypes.instanceOf(Immutable.List)
		onChange: React.PropTypes.func.isRequired

	render: ->
		values = @props.values.map (value, index) =>
			<li 
				style={liStyle}
				key={index}
				onClick={@_handleClick}
				onMouseEnter={@_highlight}
				onMouseLeave={@_unhighlight}>
				{value}
			</li>

		return null if values.size is 0

		<ul 
			style={ulStyle}
			className={OPTIONS}>
			{values}
		</ul>

	_highlight: (target) =>
		# Check if target is an event object.
		if target.hasOwnProperty("currentTarget")
			target = target.currentTarget

		target.classList.add highlightClass

	_unhighlight: =>
		el = React.findDOMNode(@)?.querySelector("li.highlight")
		el?.classList.remove highlightClass

		el

	_handleClick: (ev) =>
		@props.onChange ev.currentTarget.innerHTML

	highlightPrev: =>
		current = @_unhighlight()
		
		if current?
			current.classList.remove highlightClass
			prev = current.previousElementSibling
		
		# If current and prev aren't found, start at the top.
		# Current is not found if there is no list item highlighted.
		# Prev is not found if the first list item is highlighted.
		unless prev?
			prev = React.findDOMNode(@).lastChild

		@_highlight prev


	highlightNext: =>
		current = @_unhighlight()
		
		if current?
			current.classList.remove highlightClass
			next = current.nextElementSibling
		
		# If current and next aren't found, start at the top.
		# Current is not found if there is no list item highlighted.
		# Next is not found if the last list item is highlighted.
		unless next?
			next = React.findDOMNode(@).firstChild

		@_highlight next

	select: =>
		current = @_unhighlight()
		
		if current?
			@props.onChange current.innerHTML


module.exports = options