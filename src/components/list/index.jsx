import React from "react";

import ListItem from "./list-item/index.cjsx";

import {LIST} from "../../constants";

class List extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		let propValuesChange = this.props.values !== nextProps.values;
		let stateEditItemIndexChange = this.state.editItemIndex !== nextState.editItemIndex;

		return propValuesChange || stateEditItemIndexChange;
	}

	constructor(props) {
		super(props);

		this.state = {editItemIndex: null};
	}

	handleListItemClick(index, ev) {
		this.setState({editItemIndex: index});

		if (this.props.onClick) {
			this.props.onClick(index, ev);
		}
	}

	handleListItemCancel() {
		this.setState({editItemIndex: null});
	}

	handleListItemChange(index, newValue) {
		this.setState({editItemIndex: null});

		this.props.values[index] = newValue;
		this.props.onChange(this.props.values);
	}

	handleListItemRemove(index) {
		this.setState({editItemIndex: null});

		this.props.values.splice(index, 1);
		this.props.onChange(this.props.values);
	}

	render() {
		let list = this.props.values.map((item, index) =>
			<ListItem
				active={this.state.editItemIndex === index}
				editable={this.props.editable}
				key={index}
				onCancel={this.handleListItemCancel.bind(this, index)}
				onChange={this.handleListItemChange.bind(this, index)}
				onClick={this.handleListItemClick.bind(this, index)}
				onRemove={this.handleListItemRemove.bind(this, index)}
				removable={this.props.removable}
				value={item} />
		);

		list = list.length ?
			(this.props.ordered ?
				<ol>{list}</ol> :
				<ul>{list}</ul>
			) :
			<span>The list is empty</span>;

		return (
			<div className={LIST}>
				{list}
			</div>
		);
	}
}

List.defaultProps = {
	editable: false,
	ordered: false,
	removable: true,
	values: []
};

List.propTypes = {
	editable: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onClick: React.PropTypes.func,
	options: React.PropTypes.array,
	ordered: React.PropTypes.bool,
	removable: React.PropTypes.bool,
	values: React.PropTypes.array
};

export default List;