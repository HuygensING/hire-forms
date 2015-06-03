import React from "react/addons";

import MarginalScholarshipForm from "./form";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
				</header>
				<MarginalScholarshipForm />
			</div>
		);
	}
}

export default App;