import React, { PropTypes } from 'react';
import MultiForm from 'hire-forms-multi-form';
import IdentifierForm from 'formElements/identifier';
import LocationForm from 'formElements/location';
import Input from 'hire-forms-input';
import LiTextarea from 'formElements/li-textarea';
import {
	identifierModel,
	locationModel,
} from 'src/models';

function GeneralInformationForm({ formChangeKey, formDeleteKey, codex }) {
	return (
		<ul className="codex-form">
			<li className="well">
				<label>Codex {codex.pid}</label>
				<MultiForm
					addButtonValue="+"
					attr={"locations"}
					component={LocationForm}
					model={locationModel}
					onChange={formChangeKey}
					onDelete={formDeleteKey}
					values={codex.locations}
				/>
			</li>
			<li className="well">
				<label>Described in</label>
				<MultiForm
					addButtonValue="+"
					attr={"identifiers"}
					component={IdentifierForm}
					model={identifierModel}
					onChange={formChangeKey}
					onDelete={formDeleteKey}
					values={codex.identifiers}
				/>
			</li>
			<LiTextarea
				label="Content summary"
				onChange={formChangeKey.bind(this, 'contentSummary')}
				value={codex.contentSummary}
			/>
			<li className="well">
				<label>Number of pages</label>
				<Input
					onChange={formChangeKey.bind(this, 'folia')}
					value={codex.folia}
				/>
			</li>
		</ul>
	);
}

GeneralInformationForm.propTypes = {
	value: PropTypes.object,
};

export default GeneralInformationForm;
