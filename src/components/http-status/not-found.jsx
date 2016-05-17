import React from 'react';
import { Link } from 'react-router';

function Notfound() {
	return (
		<div className="http-status">
			The page you are requesting cannot be found.
			<br /><br />
			Take me back to <Link to="/">safety</Link>.
		</div>
	);
}

export default Notfound;
