React from 'react'

class Tab extends React.Component {
	this.defaultProps =
		active: false

	this.propTypes =
		active: React.PropTypes.bool

	render() {
		if this.props.active
			<div className="hire-tab">
				{this.props.children}
			</div>
		else
			null

export default Tab