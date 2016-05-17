import ReactDOM from 'react-dom';
import routes from './routes';
import store from './store';
import { fetchLocalities } from './actions/locality';
import { fetchPersons } from './actions/person';
import { fetchTexts } from './actions/text';
import { fetchInitialSearchResult } from './actions/search';

store.dispatch(fetchLocalities());
store.dispatch(fetchPersons());
store.dispatch(fetchTexts());
store.dispatch(fetchInitialSearchResult());

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});
