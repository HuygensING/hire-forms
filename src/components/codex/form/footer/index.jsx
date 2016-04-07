import React from "react";
import {Link, browserHistory} from "react-router";
import moment from "moment";

class EditFooter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toRecord: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.codices.saving && !nextProps.codices.saving && this.state.toRecord) {
			const codex = nextProps.codices.current;
			browserHistory.push(`/codex/${codex.pid}`);
		}
	}

	onSaveAndReturn() {
		this.props.onSave();

		this.setState({
			toRecord: true
		});
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
				<Link className="cancel" to={`/codex/${this.props.params.id}`}>Cancel</Link>
				{dates}
				<button className="delete" onClick={this.props.onRemoveCodex}>Delete</button>
				<button className="save" onClick={this.props.onSave}>Save and continue</button>
				<button className="save-return" onClick={this.onSaveAndReturn.bind(this)}>Save and return</button>
			</footer>
		);
	}
}

EditFooter.propTypes = {
	codices: React.PropTypes.object,
	onCancel: React.PropTypes.func,
	onRemoveCodex: React.PropTypes.func,
	onSave: React.PropTypes.func,
	params: React.PropTypes.object,
	type: React.PropTypes.oneOf(["author", "publication"])
};

export default EditFooter;
