React = require 'react'
Tab = require "./tab"

class Tabs extends React.Component
	constructor: (props) ->
		super props

		@state =
			activeIndex: 0
			children: @props.children

	render: ->
		labels = @props.children.map (tab, index) =>
			if @state.activeIndex is index
				className = "active"

			<li 
				key={index}
				onClick={@_handleClick.bind(@, index)} 
				className={className}>
				{tab.props.label}
			</li>

		panels = @props.children.map (tab, index) =>
			if @state.activeIndex is index
				React.cloneElement tab,
					active: true
			else
				tab

		<div className="hire-tabs">
			<ul>{labels}</ul>
			{panels}
		</div>

	_handleClick: (index, ev) =>
		@setState
			activeIndex: index

module.exports = Tabs