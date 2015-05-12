React = require 'react'
Immutable = require 'immutable'

class Form extends React.Component
	@propTypes =
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.instanceOf(Immutable.Map)

	_handleElementChange: (key, value) =>
		@props.onChange key, value

module.exports = Form