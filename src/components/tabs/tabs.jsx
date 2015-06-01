import React from "react";

class Tabs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
			children: this.props.children
		};
	}


	handleClick(index) {
		this.setState({activeIndex: index});
	}

	render() {
		let labels = this.props.children.map((tab, index) => {
			let className;

			if (this.state.activeIndex === index) {
				className = "active";
			}

			return (
				<li
					className={className}
					key={index}
					onClick={this.handleClick.bind(this, index)}>
					{tab.props.label}
				</li>
			);
		});

		let panels = this.props.children.map((tab, index) => {
			if (this.state.activeIndex === index) {
				return React.cloneElement(tab, {
					active: true,
					key: index
				});
			} else {
				return tab;
			}
		});

		return (
			<div className="hire-tabs">
				<ul>{labels}</ul>
				{panels}
			</div>
		);
	}
}

Tabs.propTypes = {
	children: React.PropTypes.element
};

export default Tabs;