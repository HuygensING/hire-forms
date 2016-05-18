import xhr from 'xhr';

export function fetch(url, cb) {
	const options = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url,
	};

	const done = (err, response, body) => {
		if (response.statusCode === 404) {
			history.push('/404');
		}

		cb(JSON.parse(body));
	};

	xhr(options, done);
}
