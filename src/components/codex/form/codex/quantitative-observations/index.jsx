import React, { PropTypes } from 'react';
import Input from 'hire-forms-input';
import LiTextarea from 'formElements/li-textarea';

export default (props) => (
	<ul className="codex-form">
		<li className="well small-inputs marginal-activity">
		{/* <li className="well small-inputs"> */}
			<label>Quantities</label>
			<ul>
				<li>
					<label>Annotated pages %</label>
				<span className="percentage">{Math.round((props.codex.marginalQuantities.firstPagesWithMarginals / props.codex.marginalQuantities.firstPagesConsidered) * 100)+"%"}</span>
					(
					<Input
						onChange={props.formChangeKey.bind(this, ["marginalQuantities", "firstPagesWithMarginals"])}
						value={props.codex.marginalQuantities.firstPagesWithMarginals}
					/>
					<span>out of </span>
					<Input
						onChange={props.formChangeKey.bind(this, ["marginalQuantities", "firstPagesConsidered"])}
						value={props.codex.marginalQuantities.firstPagesConsidered}
					/>
					)
				</li>
				<li>
					<label>Blank pages %</label>
				<span className="percentage">{Math.round((props.codex.marginalQuantities.totalBlankPages / props.codex.folia) * 100)+"%"}</span>
					(
					<Input
						onChange={props.formChangeKey.bind(this, ["marginalQuantities", "totalBlankPages"])}
						value={props.codex.marginalQuantities.totalBlankPages}
					/>
        <span>out of {props.codex.folia}</span>
					)
				</li>
				<li className="most-filled-page">
					<label>Most filled page %</label>
					<div className="input-percentage">
						<Input
							onChange={props.formChangeKey.bind(this, ["marginalQuantities", "mostFilledPagePctage"])}
							value={props.codex.marginalQuantities.mostFilledPagePctage}
						/>
						<span className="percentage">%</span>
					</div>
					(
					<Input
						onChange={props.formChangeKey.bind(this, ["marginalQuantities", "mostFilledPageDesignation"])}
						value={props.codex.marginalQuantities.mostFilledPageDesignation}
					/>
					)
				</li>
			</ul>
		</li>
		<LiTextarea
			label="Summary"
			onChange={props.formChangeKey.bind(this, "marginalsSummary")}
			value={props.codex.marginalsSummary}
		/>
	</ul>
);
