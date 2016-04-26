import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import EditIcon from '../elements/edit-icon';

function RecordHeader({ codex, authenticated }) {
	const linkToEdit = authenticated ?
		<Link to={`/codex/${codex.pid}/edit`}>{<EditIcon />} Edit</Link> :
		null;

	return (
		<header>
			<h2>{codex.name}</h2>
			{linkToEdit}
			<small>{
				`Created by ${codex.creator} on
				${moment(codex.creationDate).format('MMM Do YYYY')}.
				Last modified by ${codex.modifier} on
				${moment(codex.modificationDate).format('MMM Do YYYY')}.`
			}</small>
		</header>
  );
}

RecordHeader.propTypes = {
	authenticated: PropTypes.bool,
	codex: PropTypes.object,
};

export default connect(
	state => ({
		codex: state.codices.current,
		authenticated: state.user.authenticated,
	})
)(RecordHeader);
