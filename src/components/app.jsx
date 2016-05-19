import React, { PropTypes } from 'react';
import Header from './header';

const App = (props) =>
	<div className="app">
		<Header {...props} />
		{props.children}
	</div>;

App.propTypes = {
	children: PropTypes.element,
};

export default App;
