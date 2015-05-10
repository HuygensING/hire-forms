# React = require 'react'

# Input = require "../input"

# marginUnit = require "./stores/margin-unit"
# formActions = require "./actions/form"

# class MarginUnit extends React.Component
# 	constructor: (props) ->
# 		super props

# 		@state = 
# 			marginUnit: marginUnit.getState()

# 	componentDidMount: ->
# 		marginUnit.listen @_handleCodexChange
	
# 	componentWillUnmount: ->
# 		marginUnit.stopListening @_handleCodexChange

# 	shouldComponentUpdate: (nextProps, nextState) ->
# 		@state.marginUnit isnt nextState.marginUnit

# 	render: ->
# 		model = @state.marginUnit

# 		<ul>
# 			<li>
# 				<label>Naam</label>
# 				<Input
# 					value={model.get("naam")}
# 					onChange={@_handleElementChange.bind(@, "naam")} />
# 			</li>
# 			<li>
# 				<label>Adres</label>
# 				<Input
# 					value={model.get("adres")}
# 					onChange={@_handleElementChange.bind(@, "adres")} />
# 			</li>
# 		</ul>

# 	_handleElementChange: (key, value) =>
# 		formActions.updateMarginUnit key, value

# 	_handleCodexChange: =>
# 		@setState
# 			marginUnit: marginUnit.getState()

# module.exports = MarginUnit

