React = require 'react'
extend = require "extend"

ext = ->
	styles = {}
	for arg in arguments
		extend styles, arg
	styles

liStyle =
	cursor: "pointer"

inputStyle =
	width: "90%"

buttonStyle =
	width: "10%"

spanStyle =
	width: "90%"

inlineBlockStyle =
	display: "inline-block"
	boxSizing: "border-box"
	verticalAlign: "top"

{LISTITEM} = require "../../../constants"

class ListItem extends React.Component
	@defaultProps =
		active: false
		onClick: ->
		onCancel: ->
		onChange: ->
		onRemove: ->

	@propTypes =
		active: React.PropTypes.bool
		data: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.shape(
				key: React.PropTypes.string
				value: React.PropTypes.string
			)
		]).isRequired
		onClick: React.PropTypes.func
		onCancel: React.PropTypes.func
		onChange: React.PropTypes.func
		onRemove: React.PropTypes.func

	render: ->
		LISTITEM += " active" if @props.active

		if @props.active
			remove =
				<button
					style={ext(
						inlineBlockStyle,
						buttonStyle
					)}
					className="remove"
					onClick={@props.onRemove}>
					x
				</button>

		value = if @_isKeyValueMap(@props.data) then @props.data.value else @props.data
		span = 
			<span
				style={ext(
					inlineBlockStyle,
					spanStyle
				)}
				onClick={@props.onClick}
				className="value">
				{value}
			</span>

		<li
			style={liStyle}
			className={LISTITEM}>
			{span}
			{remove}
		</li>

	_isKeyValueMap: (map) ->
		map.hasOwnProperty("key") and map.hasOwnProperty("value")

module.exports = ListItem