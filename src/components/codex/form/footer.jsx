import React from "react";
import {Link} from "react-router";
import moment from "moment";

class EditFooter extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.codices.current !== nextProps.codices.current;
	}

	render() {
		let codex = this.props.codices.current;

		let dates = codex.creationDate != null ?
			<div className="dates">
				<span>Created by {codex.creator} on {
						moment(codex.creationDate).format("MMM Do YYYY")
					}</span>
				<br />
				<span>Modified by {codex.modifier} on {
						moment(codex.modificationDate).format("MMM Do YYYY")
					}</span>
			</div> :
			null;


		return (
			<footer>
				<button className="cancel"><Link to={`/codex/${this.props.params.id}`}>Cancel</Link></button>
				{dates}
				<button className="delete" onClick={this.props.onRemoveCodex}>Delete</button>
				<button className="save" onClick={this.props.onSave}>Save</button>
			</footer>
		);
	}
}

EditFooter.propTypes = {
	onCancel: React.PropTypes.func,
	type: React.PropTypes.oneOf(["author", "publication"])
};

export default EditFooter;
