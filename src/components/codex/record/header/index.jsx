import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import EditIcon from '../elements/edit-icon';

const RecordHeader = ({ codex, authenticated }) => {
	const linkToEdit = authenticated ?
		<Link to={`/codex/${codex.pid}/edit`}>{<EditIcon />} Edit</Link> :
		null;

	const title = (codex.name.length) ?
		codex.name :
		<i>*** NO IDENTIFIER ***</i>;

	return (
		<header>
			<h2>{title}</h2>
			{linkToEdit}
			<small>{
				`Created by ${codex.creator} on
				${moment(codex.creationDate).format('MMM Do YYYY')}.
				Last modified by ${codex.modifier} on
				${moment(codex.modificationDate).format('MMM Do YYYY')}.`
			}</small>
		</header>
  );
};

RecordHeader.propTypes = {
	authenticated: PropTypes.bool,
	codex: PropTypes.object,
};

export default RecordHeader;
