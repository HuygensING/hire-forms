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
				onChange={@_handleChangeItem.bind(@, index)}
				onRemove={@_handleRemoveItem.bind(@, index)} />
		
		<div className="list">
			<ol>
				{listItems.toJS()}
			</ol>
			<input
				value={@state.inputValue}
				onKeyDown={@_handleInputKeyDown}
				onChange={@_handleInputChange} />
		</div>

	_handleChangeItem: (index, newValue) ->
		@setState listItems: @state.listItems.set(index, newValue)

	_handleRemoveItem: (index, ev) ->
		@setState
			listItems: @state.listItems.delete(index)

	_handleInputKeyDown: (ev) ->
		if ev.keyCode is 13 and @state.inputValue.length > 0
			@setState
				inputValue: ""
				listItems: @state.listItems.push(@state.inputValue)

	_handleInputChange: (ev) ->
		@setState inputValue: ev.target.value

module.exports = List
