import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from 'src/store';
import App from 'src/components/app';
import Search from 'src/components/search';
import CodexRecord from 'src/components/codex/record';
import CodexForm from 'src/components/codex/form';
import Notfound from 'src/components/not-found';
import history from './history';


export default (
	<Provider store={store}>
		<Router history={history}>
			<Route component={App} path="/">
				<IndexRoute component={Search} />
				<Route
					component={CodexForm}
					onEnter={(nextState, replace, callback) => {
						const params = nextState.params;
						if (params.tab == null) {
							replace(`${location.pathname}/codex`);
						}
						if (params.tab === 'codex' && params.subtab == null) {
							replace(`${location.pathname}/general-information`)
						}
						callback();
					}}
					path="codex(/:id)/edit(/:tab)(/:subtab)"
				/>
				<Route component={CodexRecord} path="codex/:id(/:tab)" />
				<Route component={Notfound} path="/404" />
			</Route>
		</Router>
	</Provider>
);
