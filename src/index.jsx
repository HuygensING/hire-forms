import React from "react";
import ReactDOM from "react-dom";
import xhr from "xhr";
import {personListUrl, searchUrl, textListUrl} from "./config";

import store from "./store";
import routes from "./routes";

let container;
let docLoaded = new Promise((resolve, reject) =>
	document.addEventListener("DOMContentLoaded", () => {
		container = document.getElementById("container");
		resolve();
	})
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
			url: response.headers.location + "?rows=50"
		};

		let done = (err, response, body) =>
			resolve(JSON.parse(body));

		xhr(options, done);
	}

	xhr(options, done);
});

Promise.all(jsonPromises.concat(facetData, docLoaded)).then((values) => {
	store.dispatch({ type: "RECEIVE_PERSONS",
		persons: values[0]
	});

	store.dispatch({
		type: "RECEIVE_TEXTS",
		texts: values[1]
	});

	store.dispatch({
		type: "RECEIVE_INITIAL_SEARCH_RESULTS",
		result: values[2]
	});

	store.subscribe(() => {
		console.log("sub")
		ReactDOM.render(routes, container)
	});

	ReactDOM.render(routes, container);
});
