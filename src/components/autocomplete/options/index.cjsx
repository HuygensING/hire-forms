React = require 'react'

liStyle = {
	cursor: "pointer"
}

highlightClass = "highlight"

class AutocompleteOptions extends React.Component
	@defaultProps =
		values: []
		onSelect: ->
	
	@propTypes =
		values: React.PropTypes.array
		onSelect: React.PropTypes.func

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

		return null if values.length is 0

		<ul 
			style={position: "absolute"}
			className="hire-autocomplete-options">
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

	_handleClick: (ev) =>
		@props.onSelect ev.currentTarget.innerHTML

	select: =>
		current = @_unhighlight()
		
		if current?
			@props.onSelect current.innerHTML


module.exports = AutocompleteOptions
