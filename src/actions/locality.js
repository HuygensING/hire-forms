import xhr from 'xhr';
import { localitiesUrl } from 'src/config';

export const saveLocality = (values) => (dispatch, getState) => {
	const locality = values;
	delete locality.id;

	const options = {
		body: JSON.stringify(locality),
		headers: {
			Authorization: localStorage.getItem('hi-marschol2-auth-token'),
			'Content-Type': 'application/json',
		},
		method: 'POST',
		url: localitiesUrl,
	};

	const done = (err, response, body) => {
		// response.headers.location.split('/')
		const loc = response.headers.location;
		const id = loc.slice(loc.lastIndexOf('/') + 1);
		locality.id = id;
		dispatch({
			type: 'ADD_LOCALITY',
			locality: { ...locality },
		});
	};

	xhr(options, done);
};

export const fetchLocalities = () => (dispatch) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url: localitiesUrl,
	};

	const done = (err, resp, body) =>
		dispatch({
			type: 'GET_LOCALITIES',
			localities: JSON.parse(body),
		});

	xhr(options, done);
};
