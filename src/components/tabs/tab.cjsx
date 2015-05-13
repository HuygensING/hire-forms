React = require 'react'

class Tab extends React.Component
	@defaultProps =
		active: false

	@propTypes =
		active: React.PropTypes.bool

	render: ->
		if @props.active
			<div className="hire-tab">
				{@props.children}
			</div>
		else
			null

module.exports = Tab