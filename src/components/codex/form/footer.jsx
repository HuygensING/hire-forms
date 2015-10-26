import React from "react";
import {Link} from "react-router";

class EditFooter extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		let codex = this.props.codices.current;

		return (
			<footer>
				<button className="cancel"><Link to={`/codex/${this.props.params.id}`}>Cancel</Link></button>
				<div className="dates">
					<span>Create by {codex.creator} on {codex.creationDate}</span>
					<br />
					<span>Modified by {codex.modifier} on {codex.modificationDate}</span>
				</div>
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