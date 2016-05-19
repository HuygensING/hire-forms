import React from 'react';
import form from 'hire-forms-form';
import Input from 'hire-forms-input';
import Textarea from 'hire-forms-textarea';
import LayoutCanvas from 'src/components/codex/record/elements/layout/canvas';
import { formatMarginRatio } from 'utils';

function LayoutForm(props) {
	const codex = props.codex;
	const model = props.formData;

	const addButton = (props.addButton !== null) ?
		<li>{props.addButton}</li> :
		null;

	return (
		<ul className="layout">
			<li>
				<label>
					Textblock height
				</label>
				<Input
					onChange={props.handleChange.bind(this, "textHeightMin")}
					placeholder="min"
					value={model.textHeightMin}
				/>
				<span>-</span>
				<Input
					onChange={props.handleChange.bind(this, "textHeightMax")}
					placeholder="max"
					value={model.textHeightMax}
				/>
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
					onChange={props.handleChange.bind(this, "textWidthMin")}
					placeholder="min"
					value={model.textWidthMin}
				/>
				<span>-</span>
				<Input
					onChange={props.handleChange.bind(this, "textWidthMax")}
					placeholder="max"
					value={model.textWidthMax}
				/>
			</li>
			<li className="large">
				<label>Vertical layout</label>
				<Input
					onChange={props.handleChange.bind(this, 'verticalLayout')}
					value={model.verticalLayout}
				/>
				<LayoutCanvas
					horizontalLayout={model.horizontalLayout}
					verticalLayout={model.verticalLayout}
				/>
			</li>
			<li className="large">
				<label>Horizontal layout</label>
				<Input
					onChange={props.handleChange.bind(this, 'horizontalLayout')}
					value={model.horizontalLayout}
				/>
			</li>
			<li>
				<label>Number of lines</label>
				<Input
					onChange={props.handleChange.bind(this, "linesMin")}
					value={model.linesMin}
				/>
				<span>-</span>
				<Input
					onChange={props.handleChange.bind(this, "linesMax")}
					value={model.linesMax}
				/>
			</li>
			<li>
				<label>Line height</label>
				<Input
					onChange={props.handleChange.bind(this, "lineHeight")}
					value={model.lineHeight}
				/>
				<span>mm (per 10 lines)</span>
			</li>
			<li>
				<label>Folia range</label>
				<Input
					onChange={props.handleChange.bind(this, "pages")}
					value={model.pages}
				/>
			</li>
			<li>
				<label>Remarks</label>
				<Textarea
					onChange={props.handleChange.bind(this, "remarks")}
					value={model.remarks}
				/>
			</li>
			{addButton}
		</ul>
	);
}

LayoutForm.propTypes = {
	addButton: React.PropTypes.func,
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
};

export default form(LayoutForm);
