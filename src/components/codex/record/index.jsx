import React from "react";
import {Link} from "react-router";

class CodexRecord extends React.Component {
	componentDidMount() {
		this.props.onSetCodex(this.props.params.id);
	}

	render() {
		let codex = this.props.codices.current;

		return (
			<div className="codex-record">
				<header>
					<h2>{codex.name}</h2>
					<Link to={`/codex/${codex.pid}/edit`}>edit</Link>
				</header>
			</div>
		);
	}
}

CodexRecord.propTypes = {
	codices: React.PropTypes.object,
	onSetCodex: React.PropTypes.func,
	params: React.PropTypes.object
};

export default CodexRecord;