import React from "react/addons";

import userActions from "./actions/user";
import userStore from "./stores/user";
import MarginalScholarshipForm from "./form";

import watchStores from "./form/watch-stores";

let App = React.createClass({
	mixins: [watchStores(userStore)],

	componentDidMount() {
		userActions.getCurrentUser();
	},

	render() {
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
					<span className="user">Welcome {this.state.user.get("userName")}</span>
				</header>
				<MarginalScholarshipForm />
			</div>
		);
	}
});

export default App;