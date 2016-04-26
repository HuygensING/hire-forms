import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";
import LayoutCanvas from "../../../record/elements/layout/canvas";
import {formatMarginRatio} from "../../../../../utils"
// import LayoutCanvas from "./canvas";

// import layout from "../../stores/models/layout";

// let calcMiddle = (array) => {
// 	// The blockHeights and columnWidths are simple arrays ([5, 10, 5, 15]), so
// 	// we can clone/deepcopy them to lose the reference to the original with slice.
// 	let arr = array.slice(0);
//
// 	let last = null;
// 	let left = false;
// 	let str = '';
//
// 	while(last = arr.pop()) {
// 		let sign = left ? '<' : '>';
//
// 		str = last + sign + str
// 		left = !left
// 	}
//
// 	return str;
// }

class LayoutForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		const codex = this.props.codex;
		const model = this.props.formData;

		const addButton = (this.props.addButton !== null) ?
			<li>{this.props.addButton}</li> :
			null;
		// let horizontalLayout = (model.columnWidths.length) ?
		// 	model.marginLeft + '<' + calcMiddle(model.columnWidths) + model.marginRight :
		// 	"";
		//
		// let verticalLayout = (model.blockHeights.length) ?
		// 	model.marginTop + '<' + calcMiddle(model.blockHeights) + model.marginBottom :
		// 	"";
		// #layoutinfo
		// h3 Layout information
		// p= 'For width, fill in the measurements (in millimeters) of outer margin< textblock> inner margin, or, if applicable, margin<textblock of the first column>intercolumnal space<textblock of the second column>margin.'
		// p= 'For example: for a text in one column, with a width of 80 mm, and margins of 20 mm, the formula looks like this: 20<80>20 mm. For a text in two columns of 40 mm, with margins of 10 mm, and an intercolumnal space of 5 mm, the formula looks like this: 10<40>5<40>10 mm.'
		// p= 'For height, fill in the measurements (in millimeters) of upper margin<textblock>lower margin.'
		return (
			<ul className="layout">
				<li>
					<label>
						Textblock height
					</label>
					<Input
						onChange={this.props.handleChange.bind(this, "textHeightMin")}
						placeholder="min"
						value={model.textHeightMin} />
					<span>-</span>
					<Input
						onChange={this.props.handleChange.bind(this, "textHeightMax")}
						placeholder="max"
						value={model.textHeightMax} />
					<div className="margin-ratio">Margin ratio: {formatMarginRatio(
							codex.pageDimensionHeight,
							codex.pageDimensionWidth,
							model.textHeightMin,
							model.textHeightMax,
							model.textWidthMin,
							model.textWidthMax
						)}
					</div>
				</li>
				<li>
					<label>
						Textblock width
					</label>
					<Input
						onChange={this.props.handleChange.bind(this, "textWidthMin")}
						placeholder="min"
						value={model.textWidthMin} />
					<span>-</span>
					<Input
						onChange={this.props.handleChange.bind(this, "textWidthMax")}
						placeholder="max"
						value={model.textWidthMax} />
				</li>
				<li className="large">
					<label>Vertical layout</label>
					<Input
						onChange={this.props.handleChange.bind(this, "blockHeights")}
						value={model.blockHeights} />
					<LayoutCanvas blocks={model.blockHeights} columns={model.columnWidths}/>
				</li>
				<li className="large">
					<label>Horizontal layout</label>
					<Input
						onChange={this.props.handleChange.bind(this, "columnWidths")}
						value={model.columnWidths} />
				</li>
				<li>
					<label>Number of lines</label>
					<Input
						onChange={this.props.handleChange.bind(this, "linesMin")}
						value={model.linesMin} />
					<span>-</span>
					<Input
						onChange={this.props.handleChange.bind(this, "linesMax")}
						value={model.linesMax} />
				</li>
				<li>
					<label>Line height</label>
					<Input
						onChange={this.props.handleChange.bind(this, "lineHeight")}
						value={model.lineHeight} />
					<span>mm (per 10 lines)</span>
				</li>
				{/*<li>
					<label>Number of pages</label>
					<Input
						onChange={this.props.handleChange.bind(this, "foliaCount")}
						value={model.foliaCount} />
				</li>*/}
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.props.handleChange.bind(this, "pages")}
						value={model.pages} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.props.handleChange.bind(this, "remarks")}
						value={model.remarks} />
				</li>
				{addButton}
			</ul>
		);
	}
}

LayoutForm.propTypes = {
	addButton: React.PropTypes.func,
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func
}

export default form(LayoutForm);
