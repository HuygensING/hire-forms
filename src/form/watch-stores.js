import alwaysArray from "../utils/always-array";

let WatchStoresMixin = function(...stores) {
	stores = alwaysArray(stores);

	return {
		getInitialState() {
			return this.wsmGetStates();
		},

		componentDidMount() {
			stores.forEach((store) =>
				store.listen(this.wsmOnChange)
			);
		},

		componentWillUnmount() {
			stores.forEach((store) =>
				store.stopListening(this.wsmOnChange)
			);
		},

		wsmGetStates() {
			let states = stores.map((store) => store.getState());
			return Object.assign({}, ...states);
		},

		wsmOnChange() {
			this.setState(this.wsmGetStates());
		}
	};
};

export default WatchStoresMixin;