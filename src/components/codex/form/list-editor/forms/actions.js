import xhr from 'xhr';

export const fetch = (url, persons, done) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url,
	};

	xhr(options, (err, response, body) => {
		const model = JSON.parse(body);

		if (model.hasOwnProperty('authors')) {
			model.authors = model.authors.map((author) => {
				const keyValueAuthor = persons.find((person) => {
					// Last part of the url, representing the path
					// ie: `/persons/PER001`
					const path = person.key.substr(-1 * author['^person'].length);
					return path === author['^person'];
				});
				keyValueAuthor['^person'] = author['^person'];

				return keyValueAuthor;
			});
		}

		done(model);
	});
};

export const save = (url, data, done) => {
	// if (data.hasOwnProperty('authors')) {
	// 	const authors = R.map((author) => {
	// 		author = R.dissoc('key', author);
	// 		author = R.dissoc('value', author);
	//
	// 		return author;
	// 	}, data.authors);
	//
	// 	data = R.set(R.lensProp('authors'), authors, data);
	// }
	const isNew = !data.hasOwnProperty('pid');

	if (data.hasOwnProperty('authors')) {
		data.authors = data.authors.map((author) => {
			delete author.key;
			delete author.value;
			return author;
		});
	}

	const options = {
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			Authorization: localStorage.getItem('hi-marschol2-auth-token'),
			'Content-type': 'application/json',
		},
		method: isNew ? 'POST' : 'PUT',
		url,
	};

	xhr(options, (error, response) => {
		if (isNew) {
			xhr({
				headers: {
					Accept: 'application/json',
				},
				url: response.headers.location,
			}, (err, resp, body) => {
				done(JSON.parse(body));
			});
		} else {
			done();
		}
	});
};
