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

let promisedJson = types.map(fetchJson);

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