import React from "react";

import CodexRecord from "./codex/record";
import CodexForm from "./codex/form";
import SearchCodices from "./search";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
				</header>
				<SearchCodices {...this.props} />
				<CodexRecord {...this.props} />
				<CodexForm
					{...this.props}
					tab={this.props.router.editCodex.tab}
					onChange={this.props.onFormChangeKey}
					onDelete={this.props.onFormDeleteKey}
					onInvalid={this.props.onFormInvalid}
					visible={this.props.router.editCodex.visible} />
			</div>
		);
	}
}

App.propTypes = {

};

export default App;