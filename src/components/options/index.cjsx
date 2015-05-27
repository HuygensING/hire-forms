React = require 'react'
cx = require "classnames"

highlightClass = "highlight"

{OPTIONS} = require "../../constants"

###
# Options are rendered beneath the autocomplete and select components.
#
# @class
###
class options extends React.Component
	@defaultProps =
		values: []
		value: ""
		query: ""
		sortRelevance: true
	
	@propTypes =
		onChange: React.PropTypes.func.isRequired

		# The option values
		values: React.PropTypes.arrayOf(
			React.PropTypes.shape(
				key: React.PropTypes.string
				value: React.PropTypes.string
		))

		# The currently selected value(s)
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		])

		# The query that has been used to filter the options.
		query: React.PropTypes.string

		# Sort the options on relevance (default) instead of alphabet.
		sortRelevance: React.PropTypes.bool

	render: ->
		return null if @props.values.length is 0

		values = if @props.sortRelevance then @_sortRelevance(@props.values) else @props.values

		listitems = values.map (data, index) =>
			displayValue = data.value

			if @props.query.length
				re = new RegExp @props.query, 'ig'
				displayValue = data.value.replace re, "<span class=\"highlight\">$&</span>"

			selectedValue = if Array.isArray(@props.value) then @props.value else [@props.value]

			<li 
				className={cx(selected: selectedValue.indexOf(data.value) > -1)}
				key={index}
				onClick={@_handleClick}
				onMouseEnter={@_highlight}
				onMouseLeave={@_unhighlight}
				data-key={data.key}
				data-value={data.value}
				dangerouslySetInnerHTML={__html: displayValue}>
			</li>

		<ul 
			className={OPTIONS}>
			{listitems}
		</ul>

	###
	# Sort props.values on relevance. A result is more relevant
	# when the search query is more at the beginning of the string.
	# String.indexOf(props.query): lower is better.
	#
	# @returns {Array<String>} Sorted values on relevance
	###
	_sortRelevance: (values) ->
		values.sort (a, b) =>
			a = a.value.toLowerCase()
			b = b.value.toLowerCase()

			indexA = a.indexOf(@props.query)
			indexB = b.indexOf(@props.query)
			
			if indexA > indexB
				return 1

			if indexA < indexB
				return -1

			if indexA is indexB 
				if a > b
					return 1

				if a < b
					return -1

			0


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
		@props.onChange
			key: ev.currentTarget.getAttribute("data-key")
			value: ev.currentTarget.getAttribute("data-value")

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
			@props.onChange
				key: current.getAttribute("data-key")
				value: current.getAttribute("data-value")

module.exports = options
