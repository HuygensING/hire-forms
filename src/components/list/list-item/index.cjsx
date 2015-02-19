React = require 'react'

# require './style'

ListItem = React.createClass
	getInitialState: ->
		editMode: false
		newValue: @props.value 

	defaultProps: ->
		value: ""

	propTypes:
		value: React.PropTypes.string
		onRemove: React.PropTypes.func
	
	componentDidUpdate: (prevPros, prevState) ->
		if @state.editMode and not prevState.editMode
			node = @refs.input.getDOMNode()
			node.focus()
			node.value = node.value

	render: ->
		substring = @props.value.substr(0, @props.inputValue.length)

		if @props.inputValue.length > 0 and @props.inputValue is substring
			value =
				<span>
					<span>{@props.value.substr(0, @props.inputValue.length)}</span>
					{@props.value.substr(@props.inputValue.length)}
				</span>
		else
			value = <span>{@props.value}</span>


		<li className="list-item" onClick={@_onClick}>
			{value}
			<input
				ref="input"
				onChange={@_onChange}
				onKeyDown={@_onKeyDown}
				value={@state.newValue} />
			<span onClick={@props.onRemove}>✗</span>
		</li>

	_onChange: (ev) ->
		@setState newValue: ev.target.value

	_onKeyDown: (ev) ->
		# if keyCode is 'enter' or 'tab'
		if ev.keyCode is 13 or ev.keyCode is 9
			if @state.newValue is @props.value
				@setState editMode: false
			else
				@props.onChange(@state.newValue)
	
	_onClick: (ev) ->
		@setState editMode: true

module.exports = ListItem
