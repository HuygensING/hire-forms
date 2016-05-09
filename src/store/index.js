import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';

const logger = store => next => action => {
	if (action.hasOwnProperty('type')) {
		console.log('[REDUX]', action.type, action);
	}

	return next(action);
};

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

// const data = combineReducers(reducers);
const data = combineReducers({
	...reducers,
	routing: routerReducer,
});

export default createStoreWithMiddleware(data, window.SERVER_STATE);
// export default createStore(data)
