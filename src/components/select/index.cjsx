React = require 'react'
Immutable = require "immutable"

Options = require "../options"

{SELECT} = require "../../constants"

cx = React.addons.classSet

class Select extends React.Component
	@defaultProps =
		value: ""
		options: new Immutable.List()

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.string
		options: React.PropTypes.instanceOf(Immutable.List)
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			visible: false

	render: ->
		if @state.visible
			opts = @props.options.filter (option) =>
				option isnt @props.value

			options =
				<Options
					values=opts
					onChange={@_handleOptionsChange} />

		value = if @props.value is "" then @props.placeholder else @props.value

		<div className={SELECT}>
			<div className="input-container" onClick={@_handleInputClick}>
				<div className={cx(
						"input": true
						"placeholder": @props.value is "")}>
					{value}
				</div>
				<button>▾</button>
			</div>
			{options}
		</div>

	_handleInputClick: (ev) =>
		@setState
			visible: !@state.visible

	_handleOptionsChange: (value) =>
		@setState
			visible: false

		@props.onChange value

module.exports = Select