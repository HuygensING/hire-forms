import history from 'src/routes/history';
import xhr from 'xhr';
import { codexUrl } from 'src/config';
import { parseIncomingCodex, parseOutgoingCodex } from 'utils/parsers/codex';

const DEFAULT_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

function fetch(url, cb) {
	const options = {
		headers: DEFAULT_HEADERS,
		url,
	};

	const done = (err, response, body) => {
		if (response.statusCode === 404) {
			history.push('/404');
		}

		const parsedJson = parseIncomingCodex(JSON.parse(body));

		cb(parsedJson);
	};

	xhr(options, done);
}

const fetchCodex = (id) => (dispatch) => {
	dispatch({ type: 'REQUEST_CODEX' });

	fetch(`${codexUrl}/${id}/expandlinks`, (response) =>
		dispatch({
			type: 'RECEIVE_CODEX',
			response,
		})
	);
};

export const resetCodex = () => (dispatch, getState) => {
	const pid = getState().codices.current.pid;
	dispatch(fetchCodex(pid));
	history.push(`/codex/${pid}`);
};

export const setCodex = (id) => (dispatch, getState) => {
	const codices = getState().codices;

	if (codices.current !== null && codices.current.pid === id) {
		return;
	}

	const found = codices.all.filter((codex) => codex.pid === id);

	if (found.length) {
		dispatch({
			type: 'SET_CURRENT_CODEX',
			current: found[0],
		});
	} else {
		dispatch(fetchCodex(id));
	}
};

export function saveCodex() {
	return (dispatch, getState) => {
		const codex = getState().codices.current;

		const method = codex.pid === '' ?
			'post' :
			'put';

		dispatch({ type: 'SAVE_CODEX' });

		xhr({
			body: JSON.stringify(parseOutgoingCodex(codex)),
			headers: { ...DEFAULT_HEADERS, ...{
				Authorization: localStorage.getItem('hi-marschol2-auth-token'),
			} },
			method,
			url: `${codexUrl}/${codex.pid}`,
		}, (err, response) => {
			if (err) console.error(err);

			let id = codex.pid;

			if (response.headers.hasOwnProperty('location')) {
				const lastIndex = response.headers.location.lastIndexOf('/');
				id = response.headers.location.substr(lastIndex + 1);
			}

			dispatch({ type: 'SAVED_CODEX' });
			dispatch(fetchCodex(id));
		});
	};
}

export function removeCodex() {
	return (dispatch, getState) => {
		const codex = getState().codices.current;

		xhr({
			headers: { ...DEFAULT_HEADERS, ...{
				Authorization: getState().user.token,
			} },
			method: 'delete',
			url: `${codexUrl}/${codex.pid}`,
		}, () => {
			history.push('/');
			dispatch({
				type: 'REMOVE_CODEX',
				id: codex.pid,
			});
		});
	};
}


export const newCodex = () => (dispatch) => {
	dispatch({
		type: 'NEW_CODEX',
	});

	history.push('/codex/edit');
};

export const addUnit = (type) => (
	{
		type: 'ADD_TEXT_UNIT',
		unitType: type,
	}
);
