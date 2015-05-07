React = require 'react'

class AutocompleteOptions extends React.Component
	@defaultProps =
		values: []
	
	@propTypes =
		values: React.PropTypes.array

	render: ->
		values = @props.values.map (value, index) ->
			<li>{value}</li>

		return null if values.length is 0
		
		<ul>{values}</ul>

module.exports = AutocompleteOptions
