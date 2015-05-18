# TODO use combo (not a combolist)

React = require "react"

Combo = require "../combo"

class ListEditor extends React.Component
	@defaultProps =
		values: []

	@propTypes =
		values: React.PropTypes.array
		onChange: React.PropTypes.func.isRequired
		onDelete: React.PropTypes.func

	render: ->
		# filterFunc = (value) =>
		# 	value.toLowerCase().indexOf(@state.inputValue.toLowerCase()) > -1

		# sortFunc = (a, b) =>
		# 	indexA = a.toLowerCase().indexOf(@state.inputValue)
		# 	indexB = b.toLowerCase().indexOf(@state.inputValue)

		# 	console.log a, indexA
			
		# 	if indexA > indexB
		# 		return 1

		# 	if indexA < indexB
		# 		return -1

		# 	if indexA is indexB 
		# 		if a.toLowerCase() > b.toLowerCase()
		# 			return 1

		# 		if a.toLowerCase() < b.toLowerCase()
		# 			return -1

		# 	0

		# mapFunc =  (value, index) =>
		# 	<li key={index}>{value}</li>

		# values = @state.filteredValues.filter(filterFunc).sort(sortFunc).map(mapFunc)
		<div className="hire-list-editor">
			<Combo
				options={@props.values}
				onChange={@_handleComboChange} />
		</div>

	_handleComboChange: =>
		

module.exports = ListEditor