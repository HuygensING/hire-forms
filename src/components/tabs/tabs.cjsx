React from 'react'
Tab from "./tab"

class Tabs extends React.Component {
	constructor(props) {
		super props

		this.state =
			activeIndex: 0
			children: this.props.children

	render() {
		labels = this.props.children.map (tab, index) {
			if this.state.activeIndex is index
				className = "active"

			<li
				key={index}
				onClick={this._handleClick.bind(this., index)}
				className={className}>
				{tab.props.label}
			</li>

		panels = this.props.children.map (tab, index) {

			if this.state.activeIndex is index
				React.cloneElement tab,
					active: true
					key: index
			else
				tab

		<div className="hire-tabs">
			<ul>{labels}</ul>
			{panels}
		</div>

	_handleClick)index, ev) {
		this.setState
			activeIndex: index

export default Tabs