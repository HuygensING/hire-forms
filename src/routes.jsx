import React from "react";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import store from "./store";

import App from "./components/app";
import Search from "./components/search";
import CodexRecord from "./components/codex/record";
import CodexForm from "./components/codex/form";
import Notfound from "./components/not-found";

import Canvas from "./components/codex/form/elements/layout/canvas";

import actionHandlers from "./actions";

let createElement = (Component, props) =>
	React.createElement(Component, {
		...props, ...store.getState(), ...actionHandlers
	})

export default (
	<Router createElement={createElement} history={browserHistory}>
		<Route component={App} path="/">
			<IndexRoute component={Search}/>
			<Route
				component={CodexForm}
				path="codex(/:id)/edit(/:tab)(/:subtab)"/>
			<Route component={CodexRecord} path="codex/:id(/:tab)"/>
			<Route component={Notfound} path="/404"/>
		</Route>
		<Route component={Canvas} path="/canvas"/>
	</Router>
);
