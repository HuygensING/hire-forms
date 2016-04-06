import React, {PropTypes} from 'react';
import {Link} from "react-router";
import moment from "moment";
import EditIcon from "./elements/edit-icon";

export default class RecordHeader extends React.Component {
  render() {
		let codex = this.props.codices.current;

		let linkToEdit = this.props.user.authenticated ?
			<Link to={`/codex/${codex.pid}/edit`}>{<EditIcon />} Edit</Link> :
			null;

    return (
			<header>
				<h2>{codex.name}</h2>
				{linkToEdit}
				<small>{
					`Created by ${codex.creator} on
					${moment(codex.creationDate).format("MMM Do YYYY")}.
					Last modified by ${codex.modifier} on
					${moment(codex.modificationDate).format("MMM Do YYYY")}.`
				}</small>
			</header>
    );
  }
}

RecordHeader.propTypes = {
  codices: PropTypes.object,
  user: PropTypes.object
};
