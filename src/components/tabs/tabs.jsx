import React from "react";
import cx from "classnames";

import {elementOrArrayOfElement} from "../../utils/prop-types";
import alwaysArray from "../../utils/always-array";

class Tabs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			children: this.props.children
		};
	}

	handleClick(index) {
		this.setState({activeIndex: index});

		if (this.props.onChange) {
			let tabLabel = this.props.children[index].props.label;
			this.props.onChange(tabLabel, index);
		}
	}

	render() {
		let children = alwaysArray(this.props.children);

		let labels = children.map((tab, index) =>
			<li
				className={cx({active: tab.props.active})}
				key={index}
				onClick={this.handleClick.bind(this, index)}>
				{tab.props.label}
			</li>
		);

		return (
			<div className="hire-tabs">
				<ul>{labels}</ul>
				{children}
			</div>
		);
	}
}

Tabs.propTypes = {
	children: elementOrArrayOfElement,
	onChange: React.PropTypes.func
};

export default Tabs;