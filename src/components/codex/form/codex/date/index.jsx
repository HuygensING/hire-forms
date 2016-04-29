import React from 'react';
import Input from 'hire-forms-input';
import Date from 'formElements/date';

export default ({ codex, formChangeKey }) => (
	<ul className="codex-form">
		<li className="well">
			<ul>
				<Date value={codex.date} onChange={formChangeKey.bind(this, 'date')} />
				<li>
					<label>Source</label>
					<Input
						onChange={formChangeKey.bind(this, 'dateSource')}
						value={codex.dateSource}
					/>
				</li>
			</ul>
		</li>
	</ul>
);
