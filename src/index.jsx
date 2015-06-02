import React from "react";
React.initializeTouchEvents(true);

import Router from "react-router";
var Route = Router.Route;

import App from "./app";
import Showcase from "./showcase";
import MarginalScholarshipForm from "./form";

let routes = (
	<Route handler={App} name="app" path="/">
		<Route handler={Showcase} name="showcase" />
		<Route handler={MarginalScholarshipForm} name="form">
			<Route handler={MarginalScholarshipForm} name="codex" />
			<Route handler={MarginalScholarshipForm} name="text" />
			<Route handler={MarginalScholarshipForm} name="margin" />
			<Route handler={MarginalScholarshipForm} name="persons" />
			<Route handler={MarginalScholarshipForm} name="texts" />
		</Route>
	</Route>
);

document.addEventListener("DOMContentLoaded", function() {
	return Router.run(routes, Router.HistoryLocation, function(Handler) {
		return React.render(<Handler />, document.body);
	});
});
