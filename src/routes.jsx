import React from "react";
import {Router, Route, IndexRoute} from "react-router";

import history from "./history";
import store from "./store";

import App from "./components/app";
import Search from "./components/search";
import CodexRecord from "./components/codex/record";
import CodexForm from "./components/codex/form";
import Notfound from "./components/not-found";

import Canvas from "./components/codex/form/layout/canvas";

import actionHandlers from "./actions";

let createElement = (Component, props) =>
	React.createElement(Component, {
		...props, ...store.getState(), ...actionHandlers
	})

export default (
	<Router history={history} createElement={createElement}>
		<Route path="/" component={App}>
			<IndexRoute  component={Search}/>
			<Route
				component={CodexForm}
				path="codex(/:id)/edit(/:tab)(/:subtab)"/>
			<Route path="codex/:id(/:tab)" component={CodexRecord}/>
			<Route path="/404" component={Notfound} />
		</Route>
		<Route path="/canvas" component={Canvas} />
	</Router>
);


//    "": "search",
//    "not-found": "notFound",
//    "search(/)": "search",
//    "codex/:id/edit": "editCodex",
//    "codex/:id/:tab/edit": "editCodex",
//    "codex/:id/:tab": "codex",
//    "codex/:id": "codex"