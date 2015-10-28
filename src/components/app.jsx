import React from "react";
import Header from "./header";
import Search from "./search";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Header {...this.props} />
				{this.props.children}
			</div>
		);
	}
}

export default App;