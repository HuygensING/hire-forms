import React from "react";
import xhr from "xhr";
import {personListUrl, searchUrl, textListUrl} from "./config";

React.initializeTouchEvents(true);

window.React = React;

import store from "./store";
import routes from "./routes";

let docLoaded = new Promise((resolve, reject) =>
	document.addEventListener("DOMContentLoaded", () =>
		resolve()
	)
);

let jsonPromises = [personListUrl, textListUrl].map((url) =>
	new Promise((resolve, reject) =>
		xhr({
			headers: {
				Accept: "application/json"
			},
			url: url
		}, (err, response, body) =>
			resolve(JSON.parse(body))
		)
	)
)

let facetData = new Promise((resolve, reject) => {
	let options = {
		body: `{"facetValues":[],"term":"","sortParameters":[]}`,
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		},
		method: "post",
		url: searchUrl
	};

	let done = (err, response, body) => {
		let options = {
			headers: {
				"Accept": "application/json"
			},
			url: response.headers.location
		};

		let done = (err, response, body) => {
			let toObj = (prev, curr) => {
				if (curr.name.substr(-10) === "date_range") {
					prev[curr.name] = [curr.options[0].lowerLimit, curr.options[0].upperLimit];
				} else {
					prev[curr.name] = curr.options.map((c) =>
						c.name
					);
				}

				return prev;
			}
			let facetData = JSON.parse(body).facets.reduce(toObj, {});

			resolve(facetData);
		};

		xhr(options, done);
	}

	xhr(options, done);
});


Promise.all(jsonPromises.concat(facetData, docLoaded)).then((values) => {
	store.dispatch({
		type: "RECEIVE_PERSONS",
		persons: values[0]
	});

	store.dispatch({
		type: "RECEIVE_TEXTS",
		texts: values[1]
	});

	store.dispatch({
		type: "RECEIVE_FACET_DATA",
		facetData: values[2]
	});

	store.subscribe(() =>
		React.render(routes, document.body)
	);

	React.render(routes, document.body);
});

// // VENDOR
// import Router from "ampersand-router";
// import React from "react";

// // STORE
// import store from "./store";

// // ACTIONS
// import {changeRoute, toggleEdit, changeTab} from "./actions/router";
// // import {setUser} from "./actions/user";
// // import {setAuthorKey, deleteAuthorKey, deleteAuthor, saveAuthor} from "./actions/author";
// // import {setPublicationKey, deletePublicationKey, deletePublication, savePublication} from "./actions/publication";
// // import {fetchRelations} from "./actions/relations";

// // COMPONENTS
// import App from "./components/app";

// import config from "./config";

// const rootPath = "";

// let AppRouter = Router.extend({
// 	initialize: function() {
// 		// Subscribe to the store. On every store change,
// 		// render the app and adjust the location path.
// 		store.subscribe(() => {
// 			let state = store.getState();

// 			this.renderApp(state);

// 			if (this.history.location.pathname.substr(rootPath.length) !== state.router.path) {
// 				this.navigate(state.router.path);
// 			}
// 		});

// 		// When a new route is triggered, update the
// 		// store with the new route.
// 		this.on("route", (handler, props) =>
// 			store.dispatch(changeRoute(handler, props))
// 		);

// 		// store.dispatch(fetchRelations());
// 	},

// 	renderApp(nextState) {
// 		React.render(
// 			<App
// 				{...nextState}
// 				onFormChangeKey={(key, value) =>
// 					console.log(key, value)
// 				}
// 				onFormDeleteKey={(key) =>
// 					console.log(key)
// 				}
// 				onFormInvalid={(...args) =>
// 					console.log(...args)
// 				}
// 				onResultSelect={(item) => {
// 					let id = item["^codex"].replace(config.baseUrl + "codex/", "");
// 					store.dispatch(changeRoute("codex", [id]));
// 				}}
// 				onTabChange={(...args) =>
// 					console.log(...args)
// 				} />,
// 			document.body
// 		);
// 	},

// 	// renderApp(nextState) {
// 	// 	React.render(
// 	// 		<App
// 	// 			{...nextState}
// 	// 			onChangeAuthorKey={(key, value) =>
// 	// 				store.dispatch(setAuthorKey(key, value))
// 	// 			}
// 	// 			onChangePublicationKey={(key, value) =>
// 	// 				store.dispatch(setPublicationKey(key, value))
// 	// 			}
// 	// 			onDeleteAuthor={() =>
// 	// 				store.dispatch(deleteAuthor())
// 	// 			}
// 	// 			onDeleteAuthorKey={(key) =>
// 	// 				store.dispatch(deleteAuthorKey(key))
// 	// 			}
// 	// 			onDeletePublication={() =>
// 	// 				store.dispatch(deletePublication())
// 	// 			}
// 	// 			onDeletePublicationKey={(key) =>
// 	// 				store.dispatch(deletePublicationKey(key))
// 	// 			}
// 	// 			onLoginChange={(response) =>
// 	// 				store.dispatch(setUser(response))
// 	// 			}
// 	// 			onNavigate={this.navigate.bind(this)}
// 	// 			onNewAuthor={() =>
// 	// 				this.navigate("/persons/new")
// 	// 			}
// 	// 			onNewPublication={() =>
// 	// 				this.navigate("/documents/new")
// 	// 			}
// 	// 			onResultSelect={(item) =>
// 	// 				this.navigate(item.path.replace("domain/ww", ""))
// 	// 			}
// 	// 			onSaveAuthor={() =>
// 	// 				store.dispatch(saveAuthor())
// 	// 			}
// 	// 			onSavePublication={() =>
// 	// 				store.dispatch(savePublication())
// 	// 			}
// 	// 			onTabChange={(label) =>
// 	// 				store.dispatch(changeTab(label))
// 	// 			}
// 	// 			onToggleEdit={(edit) =>
// 	// 				store.dispatch(toggleEdit(edit))
// 	// 			} />,
// 	// 		document.body
// 	// 	);
// 	// },

// 	routes: {
// 		"": "search",
// 		"not-found": "notFound",
// 		"search(/)": "search",
// 		"codex/:id/edit": "editCodex",
// 		"codex/:id/:tab/edit": "editCodex",
// 		"codex/:id/:tab": "codex",
// 		"codex/:id": "codex"
// 	},

// 	searchAuthors: function() {},
// 	searchPublications: function() {},
// 	notFound: function() {},
// 	author: function(id, tab) {},
// 	editAuthor: function(id, tab) {},
// 	publication: function(id, tab) {},
// 	editPublication: function(id, tab) {}
// });

// document.addEventListener("DOMContentLoaded", () =>
// 	new AppRouter().history.start({
// 		root: rootPath
// 	})
// );

// // import React from "react";
// // // React.initializeTouchEvents(true);

// // import Router, {Route} from "react-router";
// // // var Route = Router.Route;

// // import App from "./app";
// // // import Showcase from "./showcase";

// // let routes = (
// // 	<Route handler={App} name="/" path="/codex/:id/edit">
// // 		<Route handler={App} path=":tab" />
// // 	</Route>
// // );

// // // <Route handler={MarginalScholarshipForm} name="text" />
// // // <Route handler={MarginalScholarshipForm} name="margin" />
// // // <Route handler={MarginalScholarshipForm} name="persons" />
// // // <Route handler={MarginalScholarshipForm} name="texts" />
// // document.addEventListener("DOMContentLoaded", function() {
// // 	return Router.run(routes, Router.HistoryLocation, function(Handler) {
// // 		return React.render(<Handler />, document.body);
// // 	});
// // });