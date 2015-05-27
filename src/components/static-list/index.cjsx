React = require 'react'
Immutable = require 'immutable'

ListItem = require './list-item/index.cjsx'

{STATICLIST} = require "../../constants"

class StaticList extends React.Component
	@defaultProps =
		options: []
		ordered: false
		removable: true
		onChange: ->

	@propTypes =
		options: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.arrayOf(
				React.PropTypes.shape(
					key: React.PropTypes.string
					value: React.PropTypes.string
				)
			)
		])
		ordered: React.PropTypes.bool
		removable: React.PropTypes.bool
		onChange: React.PropTypes.func
		onClick: React.PropTypes.func

	constructor: (props) ->
		super props

		@state =
			activeItemIndex: null

	shouldComponentUpdate: (nextProps, nextState) ->
		propValuesChange = @props.values isnt nextProps.values
		stateEditItemIndexChange = @state.activeItemIndex isnt nextState.activeItemIndex

		propValuesChange or stateEditItemIndexChange

	render: ->
		list = @props.values.map (item, index) =>
			<ListItem 
				key={index}
				data={item}
				active={@state.activeItemIndex is index}
				onClick={@_handleListItemClick.bind(@, index)}
				onCancel={@_handleListItemCancel.bind(@, index)}
				onRemove={@_handleListItemRemove.bind(@, index)} />

		if list.length
			list = if @props.ordered then <ol>{list}</ol> else <ul>{list}</ul>
		else
			list =
				<span>The list is empty</span>
		
		<div className={STATICLIST}>
			{list}
		</div>

	_handleListItemClick: (index, ev) ->
		@setState
			activeItemIndex: index

		if @props.onClick?
			@props.onClick index, ev

	_handleListItemCancel: (index, ev) ->
		@setState
			activeItemIndex: null

	_handleListItemRemove: (index, ev) ->
		@setState
			activeItemIndex: null

		@props.values.splice index, 1
		@props.onChange @props.values

module.exports = StaticList