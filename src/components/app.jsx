import React from "react";

import CodexRecord from "./codex/record";
import CodexForm from "./codex/form";
import SearchCodices from "./search";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
				</header>
				<SearchCodices {...this.props} />
				<CodexRecord {...this.props} />
				<CodexForm {...this.props} />
			</div>
		);
	}
}

export default App;