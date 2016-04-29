import { connect } from 'react-redux';
import Tabs from './tabs';
import { newCodex, resetCodex, saveCodex, setCodex } from 'actions/codices';
import { formChangeKey, formDeleteKey, formInvalid } from 'actions/form';

export default connect(
	state => ({
		authenticated: state.user.authenticated,
		codex: state.codices.current,
		facetData: state.search.facetData,
		persons: state.persons,
		texts: state.texts,
		saving: state.codices.saving,
	}),
	{
		formChangeKey,
		formDeleteKey,
		formInvalid,
		newCodex,
		resetCodex,
		saveCodex,
		setCodex,
	},
)(Tabs);
