React from "react"

AutoComplete from "../autocomplete"

class Combo extends React.Component {
	this.defaultProps =
		options: []

	this.propTypes =
		options: React.PropTypes.array
		onChange: React.PropTypes.func.isRequired
		onDelete: React.PropTypes.func

	render() {
		<div className="hire-combo" onClick={this._handleClick}>
			<AutoComplete
				ref="autocomplete"
				options={this.props.options}
				value={"Guinea"}
				onChange={this._handleAutocompleteChange}>
				<button>▾</button>
			</AutoComplete>
		</div>

	_handleClick)ev) {
		this.refs.autocomplete.toggleOptions()

	_handleAutocompleteChange)value) {
		this.props.onChange value

export default Combo