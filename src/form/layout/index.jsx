import React from "react";

import HireForm from "../base";

import Input from "../../components/input";
import Textarea from "../../components/textarea";

import layout from "../../stores/models/layout";

import {FORM} from "../../constants";

let LayoutForm = React.createClass({
	mixins: [HireForm],

	render() {
		let model = layout.merge(this.props.value);

		return (
			<ul className={FORM}>
				<li>
					<label>
						Textblock width
					</label>
					<Input
						onChange={this.handleChange.bind(this, "textWidthMin")}
						placeholder="min"
						value={model.get("textWidthMin")} />
					<span>-</span>
					<Input
						onChange={this.handleChange.bind(this, "textWidthMax")}
						placeholder="max"
						value={model.get("textWidthMax")} />
				</li>
				<li>
					<label>
						Textblock height
					</label>
					<Input
						onChange={this.handleChange.bind(this, "textHeightMin")}
						placeholder="min"
						value={model.get("textHeightMin")} />
					<span>-</span>
					<Input
						onChange={this.handleChange.bind(this, "textHeightMax")}
						placeholder="max"
						value={model.get("textHeightMax")} />
				</li>
				<li>
					<label>Horizontal layout</label>
					<Input
						onChange={this.handleChange.bind(this, "horizontalLayout")}
						value={model.get("horizontalLayout")} />
				</li>
				<li>
					<label>Vertical layout</label>
					<Input
						onChange={this.handleChange.bind(this, "verticalLayout")}
						value={model.get("verticalLayout")} />
				</li>
				<li>
					<label>Lines</label>
					<Input
						onChange={this.handleChange.bind(this, "linesMin")}
						value={model.get("linesMin")} />
					<span>-</span>
					<Input
						onChange={this.handleChange.bind(this, "linesMax")}
						value={model.get("linesMax")} />
				</li>
				<li>
					<label>Line height</label>
					<Input
						onChange={this.handleChange.bind(this, "lineHeight")}
						value={model.get("lineHeight")} />
					<span>mm (per 10 lines)</span>
				</li>
				<li>
					<label>Number of pages</label>
					<Input
						onChange={this.handleChange.bind(this, "foliaCount")}
						value={model.get("foliaCount")} />
				</li>
				<li>
					<label>Folia range</label>
					<Input
						onChange={this.handleChange.bind(this, "pages")}
						value={model.get("pages")} />
				</li>
				<li>
					<label>Remarks</label>
					<Textarea
						onChange={this.handleChange.bind(this, "remarks")}
						value={model.get("remarks")} />
				</li>
			</ul>
		);
	}
});

export default LayoutForm;