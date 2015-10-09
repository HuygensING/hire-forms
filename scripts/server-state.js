import fs from "fs";
import request from "request";

let baseUrl = "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend";
let types = [
	{
		name: "persons",
		url: baseUrl + "/lists/person"
	},
	{
		name: "texts",
		url: baseUrl + "/lists/text"
	}
];

let fetchJson =
		(opts) =>
			new Promise((resolve, reject) => {
				let options = {
					headers: {
						"Accept": "application/json"
					},
					url: opts.url
				}

				let done = (err, response, body) => {
					if (err) {
						reject(err, response, body);
					}

					body = JSON.parse(body).map((item) => {
						return {
							key: item.id,
							value: item.label
						}
					});

					resolve({[opts.name]: body});
				}

				request(options, done);
			});

let fetchFacetedSearchResults = new Promise((resolve, reject) => {
	request.post({
		body: `{"facetValues":[],"term":"","sortParameters":[]}`,
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		},
		url: baseUrl + "/search"
	}, (err, response, body) =>
		request.get(response.headers.location, (err, response, body) => {
			let toObj = (prev, curr) => {
				if (curr.name.substr(-10) === "date_range") {
					prev[curr.name] = [curr.options[0].lowerLimit, curr.options[0].upperLimit];
				} else {
					prev[curr.name] = curr.options.map((c) =>
						c.name
					);
				}

				return prev;
			}
			let facetData = JSON.parse(body).facets.reduce(toObj, {});
			resolve({"facetData": facetData})
		})
	)
})

let promisedJson = types.map(fetchJson).concat(fetchFacetedSearchResults);

Promise.all(promisedJson).then((jsons) => {
	jsons = jsons.reduce((prev, next) => {
		Object.assign(prev, next);

		return prev;
	});



	fs.writeFileSync(
		"./src/server-state.json",
		JSON.stringify({serverState: jsons}),
		"utf8"
	);
});