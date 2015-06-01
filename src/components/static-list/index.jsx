import React from "react";

import ListItem from "./list-item/index.cjsx";

import {STATICLIST} from "../../constants";

import {arrayOfStringOrArrayOfKeyValue} from "../../utils/prop-types";

class StaticList extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		let propValuesChange = this.props.values !== nextProps.values;
		let stateEditItemIndexChange = this.state.activeItemIndex !== nextState.activeItemIndex;

		return propValuesChange || stateEditItemIndexChange;
	}

	constructor(props) {
		super(props);

		this.state = {activeItemIndex: null};
	}

	handleListItemClick(index, ev) {
		this.setState({activeItemIndex: index});

		if (this.props.onClick) {
			this.props.onClick(index, ev);
		}
	}

	handleListItemCancel() {
		this.setState({activeItemIndex: null});
	}

	handleListItemRemove(index) {
		this.setState({activeItemIndex: null});

		this.props.values.splice(index, 1);
		this.props.onChange(this.props.values);
	}

	render() {
		let list = this.props.values.map((item, index) =>
			<ListItem
				active={this.state.activeItemIndex === index}
				data={item}
				key={index}
				onCancel={this.handleListItemCancel.bind(this, index)}
				onClick={this.handleListItemClick.bind(this, index)}
				onRemove={this.handleListItemRemove.bind(this, index)} />
		);

		list = list.length ?
			(this.props.ordered ?
				<ol>{list}</ol> :
				<ul>{list}</ul>
			) :
			<span>The list is empty</span>;

		return (
			<div className={STATICLIST}>
				{list}
			</div>
		);
	}
}

StaticList.defaultProps = {
	options: [],
	ordered: false,
	removable: true
};

StaticList.propTypes = {
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	options: arrayOfStringOrArrayOfKeyValue,
	ordered: React.PropTypes.bool,
	removable: React.PropTypes.bool,
	values: arrayOfStringOrArrayOfKeyValue
};

export default StaticList;