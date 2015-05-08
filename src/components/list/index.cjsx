React = require 'react'

Immutable = require 'immutable'

ListItem = require './list-item/index.cjsx'

class List extends React.Component
	@defaultProps =
		values: []
		ordered: false
		editable: false
		removable: true
		onChange: ->

	@propTypes =
		values: React.PropTypes.array
		ordered: React.PropTypes.bool
		editable: React.PropTypes.bool
		removable: React.PropTypes.bool
		onChange: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			editItemIndex: null

	render: ->
		list = @props.values.map (item, index) =>
			<ListItem 
				key={item}
				inputValue={@state.inputValue}
				value={item}
				active={@state.editItemIndex is index}
				editable={@props.editable}
				removable={@props.removable}
				onClick={@_handleListItemClick.bind(@, index)}
				onCancel={@_handleListItemCancel.bind(@, index)}
				onChange={@_handleListItemChange.bind(@, index)}
				onRemove={@_handleListItemRemove.bind(@, index)} />

		if list.length > 0
			list = if @props.ordered then <ol>{list}</ol> else <ul>{list}</ul>
		else
			list =
				<span>The list is empty</span>
		
		<div className="hire-list">
			{list}
		</div>

	_handleListItemClick: (index, ev) ->
		@setState
			editItemIndex: index

	_handleListItemCancel: (index, ev) ->
		@setState
			editItemIndex: null

	_handleListItemChange: (index, newValue) ->
		@setState 
			editItemIndex: null

		@props.values[index] = newValue
		@props.onChange @props.values

	_handleListItemRemove: (index, ev) ->
		@setState
			editItemIndex: null

		@props.values.splice index, 1
		@props.onChange @props.values

module.exports = List
