React = require 'react'

{LABEL} = require "../../constants"

class Label extends React.Component
	@defaultProps =
		value: ""

	@propTypes =
		value: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			show: false

	render: ->
		React.Children.map @props.children, (child) -> console.log child

		if @state.show
			children = @props.children

		<div className={LABEL}>
			<label onClick={@_handleClick}>{@props.value}</label>
			{children}
		</div>

	_handleClick: =>
		@setState
			show: !@state.show

module.exports = Label
