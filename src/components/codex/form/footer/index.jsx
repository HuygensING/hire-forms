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

	componentWillReceiveProps(nextProps) {
		if (this.props.saving && !nextProps.saving) {
			this.setState({
				saving: false,
			});

			if (this.state.returnToRecord) {
				const codex = nextProps.codex;
				history.push(`/codex/${codex.pid}`);
			}
		}
		if (this.props.codex.pid === '' &&
				this.props.codex.pid !== nextProps.codex.pid) {
			const { codex, routeParams } = nextProps;
			const path = `/codex/${codex.pid}/edit/${routeParams.tab}/${routeParams.subtab}`;
			history.push(path);
		}
		if (nextProps.codex.hasOwnProperty('errors')) {
			this.setState({ saving: false });
		}
	}

	onClickSave(returnToRecord = false) {
		this.props.saveCodex();
		this.setState({ saving: true, returnToRecord });
	}

	onClickDelete() {
		const codex = this.props.codex;
		const name = (codex.name !== '') ? codex.name : codex.pid;
		modal({
			html: (<div>You are about to delete:<br /><br /><i>{name}</i></div>),
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

		return (
			<footer>
				{this.state.saving ? <div className="overlay"><Loader /></div> : null}
				{tooltip}
				<button className="cancel" onClick={this.props.resetCodex}>Cancel</button>
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
	codex: PropTypes.object,
	onCancel: PropTypes.func,
	onRemoveCodex: PropTypes.func,
	resetCodex: PropTypes.func,
	saveCodex: PropTypes.func,
	saving: PropTypes.bool,
	params: PropTypes.object,
	type: PropTypes.oneOf(['author', 'publication']),
};

export default EditFooter;
