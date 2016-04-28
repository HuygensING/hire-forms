import { connect } from 'react-redux';
import ListEditor from './list-editor';
import { updatePerson } from 'actions/person';
import { updateText } from 'actions/text';

export default connect(
	state => ({
		facetData: state.search.facetData,
		persons: state.persons,
		texts: state.texts,
	}),
	{
		updatePerson,
		updateText,
	},
)(ListEditor);
