import store from "../store";

export const userLogin = (userData) =>
	store.dispatch({
		type: "USER_LOGIN",
		userData: userData
	})
