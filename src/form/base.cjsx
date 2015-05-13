React = require 'react'
Immutable = require 'immutable'

class Form extends React.Component
	@propTypes =
		attr: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.array
		]).isRequired
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.instanceOf(Immutable.Map)

	_handleElementChange: (key, value) =>
		attr = if Array.isArray(@props.attr) then @props.attr else [@props.attr]

		@props.onChange attr.concat(key), value

module.exports = Form