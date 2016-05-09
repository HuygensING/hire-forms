import fs from 'fs';
import request from 'request';

const baseUrl = 'http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend';
const types = [
	{
		name: 'persons',
		url: `${baseUrl}/lists/person`,
	},
	{
		name: 'texts',
		url: `${baseUrl}/lists/text`,
	},
];

const fetchPersonsAndTexts = (opts) =>
	new Promise((resolve, reject) => {
		const options = {
			headers: {
				Accept: 'application/json',
			},
			url: opts.url,
		};

		const done = (err, response, body) => {
			if (err) {
				reject(err, response, body);
			}

			body = JSON.parse(body).map((item) => {
				return {
					key: item.id,
					value: item.label,
				};
			});

			resolve({ [opts.name]: body });
		};

		request(options, done);
	});

const fetchFacetData = new Promise((resolve, reject) => {
	const postOptions = {
		body: '{"facetValues":[],"term":"","sortParameters":[]}',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		method: 'post',
		url: `${baseUrl}/search`,
	};

	const postDone = (error, response) => {
		const getOptions = {
			headers: {
				Accept: 'application/json',
			},
			url: `${response.headers.location}?rows=50`,
		};

		const getDone = (err, resp, body) => {
			const toObj = (prev, curr) => {
				if (curr.name.substr(-10) === 'date_range') {
					prev[curr.name] = [curr.options[0].lowerLimit, curr.options[0].upperLimit];
				} else {
					prev[curr.name] = curr.options.map((c) => c.name);
				}

				return prev;
			};
			const data = JSON.parse(body);
			data.refs = data.results;
			resolve({
				search: {
					facetData: data.facets.reduce(toObj, {}),
					queries: [],
					results: [data],
				},
			});
		};

		request(getOptions, getDone);
	};

	request(postOptions, postDone);
});




const fetchLocalities = new Promise((resolve, reject) => {
	const options = {
		headers: {
			Accept: 'application/json',
		},
		url: `${baseUrl}/localities`,
	};
	const done = (err, resp, body) =>	resolve({ localities: JSON.parse(body) });
	request(options, done);
});

const promisedJson = types
	.map(fetchPersonsAndTexts)
	.concat(fetchFacetData, fetchLocalities);

Promise.all(promisedJson).then((jsons) => {
	const reducedJsons = jsons.reduce((prev, next) => ({ ...prev, ...next }));

	fs.writeFileSync(
		'./scripts/server-state.json',
		JSON.stringify({ serverState: reducedJsons }),
		'utf8',
	);
});
