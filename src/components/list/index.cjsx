React = require 'react'
Immutable = require 'immutable'

ListItem = require './list-item'

require './list'

List = React.createClass
	getInitialState: ->
		listItems: Immutable.List(@props.initialValue)
		inputValue: ""

	defaultProps: ->
		initialValue: []

	propTypes:
		initialValue: React.PropTypes.array

	render: ->
		listItems = @state.listItems.map (item, index) =>
			<ListItem 
				key={item}
				inputValue={@state.inputValue}
				value={item}
				onRemove={@_handleRemoveItem.bind(@, index)} />
		
		<div className="list">
			<ol>
				{listItems.toJS()}
			</ol>
			<input
				value={@state.inputValue}
				onChange={@_handleInputChange}
				onKeyDown={@_handleInputKeydown} />
		</div>

	_handleInputChange: (ev) ->
		@setState inputValue: ev.target.value

	_handleInputKeydown: (ev) ->
		if ev.keyCode is 13 and @state.inputValue.length > 0
			@setState
				inputValue: ""
				listItems: @state.listItems.push(@state.inputValue)

	_handleRemoveItem: (index, ev) ->
		@setState
			listItems: @state.listItems.delete(index)


module.exports = List