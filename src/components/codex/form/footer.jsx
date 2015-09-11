import React from "react";

class EditFooter extends React.Component {
	render() {
		return (
			<footer>
				<button className="cancel">Cancel</button>
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