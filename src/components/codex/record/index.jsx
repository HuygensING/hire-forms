import React from "react";
import cx from "classnames";

class CodexRecord extends React.Component {
	render() {
		let codex = this.props.codices.current;

		return (
			<div
				className={cx(
					"codex-record",
					{visible: this.props.router.codex.visible}
				)}>
				<header>
					<h2>{codex.name}</h2>
				</header>
			</div>
		);
	}
}

CodexRecord.propTypes = {

};

export default CodexRecord;