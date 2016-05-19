import React from 'react';
import SelectList from 'hire-forms-select-list';
import LiTextarea from 'formElements/li-textarea';
import Input from 'hire-forms-input';
import MultiForm from 'hire-forms-multi-form';
import PersonForm from 'formElements/person';
import { personModel } from 'src/models';

export default (props) =>
	<div>
		<ul className="codex-form">
			<li className="well">
				<label>Type</label>
				<SelectList
					onChange={props.formChangeKey.bind(this, ['script', 'types'])}
					options={(props.facetData.facet_s_codex_script_type || []).sort()}
					values={props.codex.script.types}
				/>
			</li>
		</ul>
		<ul className="codex-form">
			<LiTextarea
				label="Type remarks"
				onChange={props.formChangeKey.bind(this, ['script', 'remarks'])}
				value={props.codex.script.remarks}
			/>
		</ul>
		<ul className="codex-form">
			<li className="well">
				<ul>
					<li>
						<label>Characteristics</label>
						<Input
							onChange={props.formChangeKey.bind(this, ['script', 'characteristics'])}
							value={props.codex.script.characteristics}
						/>
					</li>
					<li>
						<label>Number of hands</label>
						<Input
							onChange={props.formChangeKey.bind(this, ['script', 'handsCount'])}
							value={props.codex.script.handsCount}
						/>
					</li>
					<li>
						<label>Range</label>
						<Input
							onChange={props.formChangeKey.bind(this, ['script', 'handsRange'])}
							value={props.codex.script.handsRange}
						/>
					</li>
				</ul>
			</li>
		</ul>
		<ul className="codex-form">
			<li className="well">
				<label>Scribes</label>
				<MultiForm
					{...props}
					addButtonValue="+"
					attr={['script', 'scribes']}
					component={PersonForm}
					model={personModel}
					onChange={props.formChangeKey}
					onDelete={props.formDeleteKey}
					values={props.codex.script.scribes}
				/>
			</li>
			<LiTextarea
				label="Remarks"
				onChange={props.formChangeKey.bind(this, ['script', 'scribeRemarks'])}
				value={props.codex.script.scribeRemarks}
			/>
		</ul>
	</div>;
