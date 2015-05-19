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
		<div className="hire-combo" onClick={@_handleClick}>
			<AutoComplete
				ref="autocomplete"
				options={@props.options}
				value={"Guinea"}
				onChange={@_handleAutocompleteChange}>
				<button>▾</button>
			</AutoComplete>
		</div>

	_handleClick: (ev) =>
		@refs.autocomplete.toggleOptions()

	_handleAutocompleteChange: (value) =>
		@props.onChange value

module.exports = Combo