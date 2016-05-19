import React from 'react';
import { Link } from 'react-router';

export default () =>
	<div className="http-status">
		You are unauthorized to view the requested page.
		<br />
		Please login.
		<br /><br />
		Take me back to <Link to="/">safety</Link>.
	</div>;
