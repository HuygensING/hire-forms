import ReactDOM from 'react-dom';
import routes from './routes';
import store from './store';
import { fetchLocalities } from './actions/locality';
import { fetchPersons } from './actions/person';
import { fetchTexts } from './actions/text';

store.dispatch(fetchLocalities());
store.dispatch(fetchPersons());
store.dispatch(fetchTexts());

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});
//
// let jsonPromises = [personListUrl, textListUrl].map((url) =>
// 	new Promise((resolve, reject) =>
// 		xhr({
// 			headers: {
// 				Accept: 'application/json'
// 			},
// 			url: url
// 		}, (err, response, body) =>
// 			resolve(JSON.parse(body))
// 		)
// 	)
// )
//
// let facetData = new Promise((resolve, reject) => {
// 	let options = {
// 		body: `{'facetValues':[],'term':'','sortParameters':[]}`,
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-type': 'application/json'
// 		},
// 		method: 'post',
// 		url: searchUrl
// 	};
//
// 	let done = (err, response, body) => {
// 		let options = {
// 			headers: {
// 				'Accept': 'application/json'
// 			},
// 			url: response.headers.location + '?rows=50'
// 		};
//
// 		let done = (err, response, body) =>
// 			resolve(JSON.parse(body));
//
// 		xhr(options, done);
// 	}
//
// 	xhr(options, done);
// });
//
// Promise.all(jsonPromises.concat(facetData, docLoaded)).then((values) => {
// 	store.dispatch({ type: 'RECEIVE_PERSONS',
// 		persons: values[0]
// 	});
//
// 	store.dispatch({
// 		type: 'RECEIVE_TEXTS',
// 		texts: values[1]
// 	});
//
// 	store.dispatch({
// 		type: 'RECEIVE_INITIAL_SEARCH_RESULTS',
// 		result: values[2]
// 	});
//
// 	// store.subscribe(() => {
// 	// 	ReactDOM.render(routes, container)
// 	// });

	// ReactDOM.render(routes, container);
// });
