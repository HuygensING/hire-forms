# React = require 'react'
# Immutable = require 'immutable'
# extend = require "extend"

# Input = require "./components/input"

# marginUnit = require "./stores/margin-unit"
# codexActions = require "./actions/form"

# class MultiForm extends React.Component
# 	@propTypes =
# 		attr: React.PropTypes.oneOfType([
# 			React.PropTypes.string,
# 			React.PropTypes.array
# 		]).isRequired
# 		# view: React.PropTypes.element.isRequired
# 		value: React.PropTypes.instanceOf(Immutable.List)
# 		onChange: React.PropTypes.func

# 	@defaultProps =
# 		value: new Immutable.List()

# 	render: ->
# 		views = @props.value.map (listItem, index) =>
# 			<li key={index}>
# 				<@props.view
# 					value={listItem}
# 					onChange={@_handleElementChange.bind(@, index)} />
# 			</li>

# 		<ul>{views}</ul>

# 	_handleElementChange: (index, key, value) =>
# 		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]
# 		key = attr.concat(index).concat(key)
		
# 		@props.onChange key, value

# module.exports = MultiForm

