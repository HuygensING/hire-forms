import 'babel-polyfill';
import ReactDOM from 'react-dom';
import routes from './routes';
import store from './store';
import { fetchIdentifierTypes } from 'actions/codices';
import { fetchInitialSearchResult } from 'actions/search';
import { fetchLocalities } from 'actions/locality';
import { fetchPersons } from 'actions/person';
import { fetchTexts } from 'actions/text';

store.dispatch(fetchIdentifierTypes());
store.dispatch(fetchInitialSearchResult());
store.dispatch(fetchLocalities());
store.dispatch(fetchPersons());
store.dispatch(fetchTexts());

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});
