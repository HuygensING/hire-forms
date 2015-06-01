// TODO use visible state instead of options list

React from 'react'

Input from '../input'
Options from '../options'

divStyle = {
	position: "relative"
}

{LISTFILTER} from "../../constants"

class ListFilter extends React.Component {
	this.defaultProps =
		options: []
		minLength: 0

	this.propTypes =
		// The onChange should be called onSelect,
		// but onChange keeps it in par with the other components.
		onChange: React.PropTypes.func.isRequired
		minLength: React.PropTypes.number
		options: React.PropTypes.array
		placeholder: React.PropTypes.string
		value: React.PropTypes.string

	constructor(props) {
		super props

		this.state =
			query: ""
			options: this.props.options

	render() {
		<div
			className={LISTFILTER}
			style={divStyle}>
			<Input
				ref="input"
				value={this.state.query}
				placeholder={this.props.placeholder}
				onChange={this._handleInputChange}
				onKeyDown={this._handleInputKeyDown} />
			{this.props.children}
			<Options
				ref="options"
				value={this.props.value}
				values={this.state.options}
				query={this.state.query}
				onChange={this._handleOptionsChange} />
		</div>

	_handleInputChange)inputValue, ev) {
		// Return empty options if inputValue length is beneath a treshold.
		if inputValue.length < this.props.minLength
			return this.setState
				inputValue: inputValue
				options: []

		this._filter inputValue

	_filter)inputValue) {
		this.setState
			query: inputValue
			options: this.props.options.filter (value) {
				value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1

	_handleInputKeyDown)ev) {
		// Up
		if ev.keyCode is 38
			this.refs.options.highlightPrev()

		// Down
		if ev.keyCode is 40
			this.refs.options.highlightNext()

		// Enter
		if ev.keyCode is 13
			this.refs.options.select()

		// Escape
		if ev.keyCode is 27
			this.clear()

	_handleOptionsChange)value) {
		this.props.onChange value

export default ListFilter
