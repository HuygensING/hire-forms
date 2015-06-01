React from 'react'

{LABEL} from "../../constants"

class Label extends React.Component {
	this.defaultProps =
		value: ""

	this.propTypes =
		value: React.PropTypes.string

	constructor(props) {
		super props

		this.state =
			show: false

	render() {
		React.Children.map this.props.children, (child) { console.log child

		if this.state.show
			children = this.props.children

		<div className={LABEL}>
			<label onClick={this._handleClick}>{this.props.value}</label>
			{children}
		</div>

	_handleClick: =>
		this.setState
			show: !this.state.show

export default Label
