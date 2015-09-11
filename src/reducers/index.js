import {combineReducers} from "redux";

import router from "./router";
import codices from "./codices";

export default combineReducers({
	router: router,
	codices: codices
});