React from 'react'
Immutable from "immutable"

Checkbox from "../checkbox"

{MULTISELECT} from "../../constants"

class MultiSelect extends React.Component {
	this.defaultProps =
		values: []
		options: []

	this.propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.array
		options: React.PropTypes.array
		placeholder: React.PropTypes.string

	render() {
		options = this.props.options.map (option, index) {
			<Checkbox
				key={index}
				value={this.props.values.indexOf(option) > -1}
				label={option}
				onChange={this._handleChange.bind(this., index)} />

		<div className={MULTISELECT}>
			{options}
		</div>

	_handleChange)index, checked) {
		option = this.props.options[index]

		if checked
			this.props.values.push(option)
			this.props.onChange this.props.values
		else
			valueIndex = this.props.values.indexOf(option)
			this.props.values.splice valueIndex, 1
			this.props.onChange this.props.values

export default MultiSelect
