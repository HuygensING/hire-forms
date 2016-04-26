import React, { PropTypes } from 'react';
import Input from 'hire-forms-input';
import MultiForm from 'hire-forms-multi-form';
import LiTextarea from '../../elements/li-textarea';
import LayoutForm from '../layout';
import {
	layoutModel,
} from '../../../../../models';

export default (props) => (
	<ul className="codex-form">
		<li className="well small-inputs page-dimensions">
			<label>Page dimensions</label>
			<div>
				<label>
					<span>Height</span>
					<span>x</span>
					<span>width</span>
					<span>=</span>
				</label>
				<Input
					onChange={props.formChangeKey.bind(this, "pageDimensionHeight")}
					value={props.codex.pageDimensionHeight}
				/>
				<span>mm</span>
				<span>x</span>
				<Input
					onChange={props.formChangeKey.bind(this, "pageDimensionWidth")}
					value={props.codex.pageDimensionWidth}
				/>
				<span>mm</span>
			</div>
		</li>
		<LiTextarea
			label="Collation"
			onChange={props.formChangeKey.bind(this, "quireStructure")}
			value={props.codex.quireStructure}
		/>
		<li className="well small-inputs">
			<label>Layout</label>
			<MultiForm
				{...props}
				addButtonValue="+"
				attr="pageLayouts"
				component={LayoutForm}
				model={layoutModel}
				onChange={props.formChangeKey}
				onDelete={props.formDeleteKey}
				values={props.codex.pageLayouts}
			/>
		</li>
		<LiTextarea
			label="Remarks"
			onChange={props.formChangeKey.bind(this, "layoutRemarks")}
			value={props.codex.layoutRemarks}
		/>
	</ul>
);
