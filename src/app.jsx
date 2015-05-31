import React from "react/addons";
import Router from "react-router";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<header>
					<h1>Marginal Scholarship</h1>
				</header>

				<Router.RouteHandler />
			</div>
		);
	}
}

export default App;