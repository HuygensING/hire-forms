React = require 'react'
Immutable = require 'immutable'

ListItem = require './list-item/index.cjsx'

class List extends React.Component
	@defaultProps =
		values: new Immutable.List()
		ordered: false
		editable: false
		removable: true
		onChange: ->

	@propTypes =
		values: React.PropTypes.instanceOf(Immutable.List)
		ordered: React.PropTypes.bool
		editable: React.PropTypes.bool
		removable: React.PropTypes.bool
		onChange: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			editItemIndex: null

	shouldComponentUpdate: (nextProps, nextState) ->
		propValuesChange = @props.values isnt nextProps.values
		stateEditItemIndexChange = @state.editItemIndex isnt nextState.editItemIndex

		propValuesChange or stateEditItemIndexChange

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

		if list.size > 0
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

		@props.onChange @props.values.set index, newValue

	_handleListItemRemove: (index, ev) ->
		@setState
			editItemIndex: null

		@props.onChange @props.values.delete index

module.exports = List
