import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MultiForm from 'hire-forms-multi-form';
import IdentifierForm from '../../elements/identifier';
import LocationForm from '../../elements/location';
import Input from 'hire-forms-input';
import LiTextarea from '../../elements/li-textarea';
import {
	identifierModel,
	locationModel,
} from '../../../../../models';
import { formChangeKey, formDeleteKey } from '../../../../../actions/form';

// class GeneralInformationForm extends React.Component {
	// shouldComponentUpdate({ value }) {
	// 	return this.props.value.locations !== value.locations
	// 		|| this.props.value.identifiers !== value.identifiers
	// }
function GeneralInformationForm({ value }) {
	return (
		<ul className="codex-form">
			<li className="well">
				<label>Codex {value.pid}</label>
				<MultiForm
					addButtonValue="+"
					attr={"locations"}
					component={LocationForm}
					model={locationModel}
					onChange={formChangeKey}
					onDelete={formDeleteKey}
					values={value.locations}
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
					values={value.identifiers}
				/>
			</li>
			<LiTextarea
				label="Content summary"
				onChange={formChangeKey.bind(this, 'contentSummary')}
				value={value.contentSummary}
			/>
			<li className="well">
				<label>Number of pages</label>
				<Input
					onChange={formChangeKey.bind(this, 'folia')}
					value={value.folia}
				/>
			</li>
		</ul>
	);
}

GeneralInformationForm.propTypes = {
	value: PropTypes.object,
};

export default connect(
	null,
	{
		formChangeKey,
		formDeleteKey,
	}
)(GeneralInformationForm);
