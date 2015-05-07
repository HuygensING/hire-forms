React = require 'react'

Immutable = require 'immutable'

ListItem = require './list-item/index.cjsx'

inputStyle =
	width: "100%"

List = React.createClass
	getInitialState: ->
		listItems: Immutable.List(@props.initialValue)
		editItemIndex: null
		inputValue: ""

	defaultProps: ->
		initialValue: []
		ordered: false

	propTypes:
		initialValue: React.PropTypes.array
		ordered: React.PropTypes.bool

	render: ->
		listItems = @state.listItems.map (item, index) =>
			<ListItem 
				key={item}
				inputValue={@state.inputValue}
				value={item}
				editing={@state.editItemIndex is index}
				onClick={@_handleListItemClick.bind(@, index)}
				onCancel={@_handleListItemCancel.bind(@, index)}
				onChange={@_handleListItemChange.bind(@, index)}
				onRemove={@_handleListItemRemove.bind(@, index)} />

		if listItems.size > 0
			listItems = if @props.ordered then <ol>{listItems}</ol> else <ul>{listItems}</ul>
		else
			listItems =
				<span className="empty-list">The list is empty</span>
		
		<div className="hire-list">
			{listItems}
			<input
				style={inputStyle}
				className="list-input"
				value={@state.inputValue}
				onKeyDown={@_handleInputKeyDown}
				onChange={@_handleInputChange} />
		</div>

	_handleListItemClick: (index, ev) ->
		@setState editItemIndex: index

	_handleListItemCancel: (index, ev) ->
		@setState editItemIndex: null

	_handleListItemChange: (index, newValue) ->
		@setState 
			editItemIndex: null
			listItems: @state.listItems.set(index, newValue)

	_handleListItemRemove: (index, ev) ->
		@setState
			editItemIndex: null
			listItems: @state.listItems.delete(index)

	_handleInputKeyDown: (ev) ->
		if ev.keyCode is 13 and @state.inputValue.length > 0
			@setState
				inputValue: ""
				listItems: @state.listItems.push(@state.inputValue)

	_handleInputChange: (ev) ->
		@setState inputValue: ev.target.value

module.exports = List
