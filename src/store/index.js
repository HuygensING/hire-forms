import {createStore, applyMiddleware, combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import * as reducers from "../reducers";
import thunkMiddleware from "redux-thunk";

const logger = store => next => action => {
	if (action.hasOwnProperty("type")) {
		console.log("[REDUX]", action.type, action);
	}

	return next(action);
};

let createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);

// let data = combineReducers(reducers);
let data = combineReducers({
	...reducers,
	routing: routerReducer
});

export default createStoreWithMiddleware(data);
// export default createStore(data)
