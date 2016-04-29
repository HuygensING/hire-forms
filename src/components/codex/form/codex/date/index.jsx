import React from 'react';
import Input from 'hire-forms-input';
import { validateDate } from 'utils/validation';

export default ({ codex, formChangeKey }) => (
	<ul className="codex-form">
		<li className="well">
			<ul>
				<li>
					<label>Date</label>
					<Input
						onChange={formChangeKey.bind(this, 'date')}
						validate={validateDate}
						value={codex.date}
					/>
				</li>
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
