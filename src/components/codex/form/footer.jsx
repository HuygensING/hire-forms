import React from "react";
import {Link} from "react-router";

class EditFooter extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<footer>
				<button className="cancel"><Link to={`/codex/${this.props.params.id}`}>Cancel</Link></button>
				<button className="delete" onClick={this.props.onDelete}>Delete</button>
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