React = require "react"

AutoComplete = require "../autocomplete"

class Combo extends React.Component
	@defaultProps =
		options: []

	@propTypes =
		options: React.PropTypes.array
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

		<div className="hire-combo">
			<AutoComplete
				ref="autocomplete"}
				options={@props.options}
				minLength=0
				onChange={@_handleAutocompleteChange}>
				<button onClick={@_handleButtonClick}>▾</button>
			</AutoComplete>
		</div>

	_handleButtonClick: (ev) =>

	_handleAutocompleteChange: (value) =>
		@props.onChange value

module.exports = Combo