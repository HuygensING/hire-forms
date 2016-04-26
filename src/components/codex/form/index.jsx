import { connect } from 'react-redux';
import Tabs from './tabs';
import { newCodex, setCodex } from 'actions/codices';
import { formChangeKey, formDeleteKey, formInvalid } from 'actions/form';

export default connect(
	state => ({
		authenticated: state.user.authenticated,
		codex: state.codices.current,
		saving: state.codices.saving,
	}),
	{
		formChangeKey,
		formDeleteKey,
		formInvalid,
		newCodex,
		setCodex,
	},
)(Tabs);
