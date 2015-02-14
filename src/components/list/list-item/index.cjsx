React = require 'react'

require './list-item'

ListItem = React.createClass
	defaultProps: ->
		value: ""

	propTypes:
		value: React.PropTypes.string
		onRemove: React.PropTypes.func

	render: ->
		className = "list-item"
		
		substring = @props.value.substr(0, @props.inputValue.length)

		if @props.inputValue.length > 0 and @props.inputValue is substring
			value = @props.value.replace(substring, "<span class=\"highlight\">#{substring}</span>")
		else
			value = @props.value

		<li className={className}>
			<span dangerouslySetInnerHTML={{__html: value}} />
			<span className="remove" onClick={@props.onRemove}>✗</span>
		</li>

module.exports = ListItem