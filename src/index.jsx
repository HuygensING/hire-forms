import React from "react";
React.initializeTouchEvents(true);

import App from "./app";
import Showcase from "./showcase";
import MarginalScholarshipForm from "./form";

import Router from "react-router";
var Route = Router.Route;

var routes = (
	<Route handler={App} name="app" path="/">
		<Route handler={Showcase} name="showcase" />
		<Route handler={MarginalScholarshipForm} name="form" />
	</Route>
);

document.addEventListener("DOMContentLoaded", function() {
	return Router.run(routes, Router.HistoryLocation, function(Handler) {
		return React.render(<Handler />, document.body);
	});
});
