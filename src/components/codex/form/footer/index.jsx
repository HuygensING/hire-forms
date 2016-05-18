import React, { Component, PropTypes } from 'react';
import Tooltip from 'hire-tooltip';
import history from 'src/routes/history';
import moment from 'moment';
import Loader from './loader';
import modal from 'formElements/modal';

class EditFooter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			returnToRecord: false,
		};
	}

	componentWillReceiveProps({ codex, routeParams, saving }) {
		const hasErrors = codex.hasOwnProperty('errors');

		if (!hasErrors) this.adjustHistory(codex, routeParams);

		const nextState = hasErrors ?
			{ saving: false } :
			{	saving };
		this.setState(nextState);
	}

	onClickSave(returnToRecord = false) {
		this.props.saveCodex();
		this.setState({
			saving: true,
			returnToRecord,
		});
	}

	onClickDelete() {
		const codex = this.props.codex;
		const name = (codex.name !== '') ? codex.name : codex.pid;
		modal({
			html: (<div>You are about to delete:<br /><br /><i>{name}</i></div>),
			onConfirm: () => this.props.removeCodex(),
		});
	}

	adjustHistory(codex, routeParams) {
		let path;

		if (this.state.returnToRecord && codex.pid !== '') {
			path = `/codex/${codex.pid}`;
		// Else if a NEW codex was saved
		} else if (
			this.props.codex.pid === '' &&
			this.props.codex.pid !== codex.pid
		) {
			path = `/codex/${codex.pid}`;
			if (!this.state.returnToRecord) {
				path += `/edit/${routeParams.tab}/${routeParams.subtab}`;
			}
		}

		// Path is null when an exisiting codex is saved with 'Save and continue',
		// in all other cases, the history should be updated
		if (path != null) history.push(path);
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

		const tooltip = (this.props.codex.hasOwnProperty('errors')) ?
			<Tooltip
				backgroundColor="#F44336"
				orientation="top"
				shift={this.state.returnToRecord ? 0.82 : 0.42}
			>
				<ul>
					{codex.errors.map((err, index) => <li key={index}>{err}</li>)}
				</ul>
			</Tooltip> : null;

		const cancel = (this.props.codex.pid !== '') ?
			<button className="cancel" onClick={this.props.resetCodex}>Cancel</button> :
			null;

		const deleteButton = (this.props.codex.pid !== '') ?
			<button className="delete" onClick={this.onClickDelete.bind(this)}>
				Delete
			</button> :
			null;

		return (
			<footer>
				{this.state.saving ? <div className="overlay"><Loader /></div> : null}
				{tooltip}
				{cancel}
				{dates}
				{deleteButton}
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
	codex: PropTypes.object,
	onCancel: PropTypes.func,
	params: PropTypes.object,
	removeCodex: PropTypes.func,
	resetCodex: PropTypes.func,
	saveCodex: PropTypes.func,
	saving: PropTypes.bool,
	type: PropTypes.oneOf(['author', 'publication']),
};

export default EditFooter;
