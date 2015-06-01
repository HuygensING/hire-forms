// TODO add autoresize

React from 'react'
cx from "classnames"

{TEXTAREA} from "../../constants"

class Textarea extends React.Component {
	this.defaultProps =
		value: ""
		onChange: ->
		onKeyDown: ->
		onKeyUp: ->

	this.propTypes =
		value: React.PropTypes.string
		placeholder: React.PropTypes.string
		onChange: React.PropTypes.func
		onKeyDown: React.PropTypes.func
		onKeyUp: React.PropTypes.func
		style: React.PropTypes.object

	constructor(props) {
		super props

		this.state =
			focus: false

	shouldComponentUpdate)nextProps, nextState) {
		stateChange = this.state isnt nextState
		propsChange = this.props.value isnt nextProps.value

		stateChange or propsChange

	render() {
		<textarea
			className={cx(
				TEXTAREA,
				focus: this.state.focus
			)}
			style={this.props.style}
			value={this.props.value}
			placeholder={this.props.placeholder}
			onKeyDown={this._handleKeyDown}
			onKeyUp={this._handleKeyUp}
			onChange={this._handleChange}
			onFocus={this._toggleFocus}
			onBlur = {this._toggleFocus} />

	_toggleFocus: =>
		this.setState
			focus: not this.state.focus

	_handleKeyDown)ev) {
		this.props.onKeyDown ev

	_handleKeyUp)ev) {
		this.props.onKeyUp ev

	_handleChange)ev) {
		this.props.onChange ev.currentTarget.value, ev

export default Textarea
