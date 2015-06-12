import React from "react";
// React.initializeTouchEvents(true);

import Router, {Route} from "react-router";
// var Route = Router.Route;

import App from "./app";
// import Showcase from "./showcase";

let routes = (
	<Route handler={App} name="/" path="/codex/:id/edit">
		<Route handler={App} path=":tab" />
	</Route>
);

// <Route handler={MarginalScholarshipForm} name="text" />
// <Route handler={MarginalScholarshipForm} name="margin" />
// <Route handler={MarginalScholarshipForm} name="persons" />
// <Route handler={MarginalScholarshipForm} name="texts" />
document.addEventListener("DOMContentLoaded", function() {
	return Router.run(routes, Router.HistoryLocation, function(Handler) {
		return React.render(<Handler />, document.body);
	});
});