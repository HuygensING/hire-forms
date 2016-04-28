import React from 'react';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';
import Loader from './loader';
import confirm from './confirm';

class EditFooter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			returnToRecord: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.saving && !nextProps.saving) {
			this.setState({
				saving: false
			});

			if (this.state.returnToRecord) {
				const codex = nextProps.codex;
				browserHistory.push(`/codex/${codex.pid}`);
			}
		}
	}

	onClickSave(returnToRecord=false) {
		this.props.saveCodex();

		let nextState = {saving: true};
		if (returnToRecord) nextState.returnToRecord = true;

		this.setState(nextState);
	}

	onClickDelete() {
		const codex = this.props.codex;
		confirm({
			html: `You are about to delete:<br><br><i>${codex.name}</i>`,
			onConfirm: () => this.props.onRemoveCodex(),
		});
	}

	render() {
		const codex = this.props.codex;

		let dates = codex.creationDate != null ?
			<div className="dates">
				<span>Created by {codex.creator} on {
						moment(codex.creationDate).format('MMM Do YYYY')
					}</span>
				<br />
				<span>Modified by {codex.modifier} on {
						moment(codex.modificationDate).format('MMM Do YYYY')
					}</span>
			</div> :
			null;

		return (
			<footer>
				{this.state.saving ? <div className="overlay"><Loader /></div> : null}
				<Link className="cancel" to={`/codex/${this.props.params.id}`}>Cancel</Link>
				{dates}
				<button className="delete" onClick={this.onClickDelete.bind(this)}>
					Delete
				</button>
				<button className="save" onClick={this.onClickSave.bind(this, false)}>
					Save and continue
				</button>
				<button className="save-return" onClick={this.onClickSave.bind(this, true)}>
					Save and return
				</button>
			</footer>
		);
	}
}

EditFooter.propTypes = {
	codex: React.PropTypes.object,
	onCancel: React.PropTypes.func,
	onRemoveCodex: React.PropTypes.func,
	saveCodex: React.PropTypes.func,
	params: React.PropTypes.object,
	type: React.PropTypes.oneOf(['author', 'publication']),
};

export default EditFooter;
