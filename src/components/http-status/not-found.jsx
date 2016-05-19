import React from 'react';
import { Link } from 'react-router';

export default () =>
	<div className="http-status">
		The page you are requesting cannot be found.
		<br /><br />
		Take me back to <Link to="/">safety</Link>.
	</div>;
