React = require 'react'

require './list-item'

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
		className = "list-item"
		className += " edit" if @state.editMode
		
		substring = @props.value.substr(0, @props.inputValue.length)

		if @props.inputValue.length > 0 and @props.inputValue is substring
			value = @props.value.replace(substring, "<span class=\"highlight\">#{substring}</span>")
		else
			value = @props.value

		<li className={className} onClick={@_onClick}>
			<span className="value" dangerouslySetInnerHTML={{__html: value}} />
			<input ref="input" onChange={@_onChange} onKeyDown={@_onKeyDown} value={@state.newValue} />
			<span className="remove" onClick={@props.onRemove}>✗</span>
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
