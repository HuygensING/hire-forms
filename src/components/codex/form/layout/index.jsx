import React from "react";

import form from "hire-forms-form";

import Input from "hire-forms-input";
import Textarea from "hire-forms-textarea";

// import layout from "../../stores/models/layout";

class LayoutForm extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.formData !== nextProps.formData)
	}

	render() {
		let model = this.props.formData;

		let addButton = (this.props.addButton != null) ?
			<li>{this.props.addButton}</li> :
			null;

		return (
			<ul>
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
				</li>
				<li>
					<label>Horizontal layout</label>
					<Input
						onChange={this.props.handleChange.bind(this, "horizontalLayout")}
						value={model.horizontalLayout} />
				</li>
				<li>
					<label>Vertical layout</label>
					<Input
						onChange={this.props.handleChange.bind(this, "verticalLayout")}
						value={model.verticalLayout} />
				</li>
				<li>
					<label>Lines</label>
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
				<li>
					<label>Number of pages</label>
					<Input
						onChange={this.props.handleChange.bind(this, "foliaCount")}
						value={model.foliaCount} />
				</li>
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

export default form(LayoutForm);