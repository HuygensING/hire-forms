import history from 'src/routes/history';
import xhr from 'xhr';
import { codexUrl, identifierTypesUrl } from 'src/config';
import { parseIncomingCodex, parseOutgoingCodex } from 'utils/parsers/codex';
import { validateCodex } from 'utils/validation';
import { fetch } from 'utils/fetch';

const DEFAULT_HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const fetchCodex = (id) => (dispatch) => {
	dispatch({ type: 'REQUEST_CODEX' });

	fetch(`${codexUrl}/${id}/expandlinks`, (response) =>
		dispatch({
			type: 'RECEIVE_CODEX',
			response: parseIncomingCodex(response),
		})
	);
};

export const fetchIdentifierTypes = () => (dispatch) =>
	fetch(identifierTypesUrl, (identifierTypes) =>
		dispatch({
			type: 'RECEIVE_IDENTIFIER_TYPES',
			identifierTypes,
		})
	);

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

		const validationErrors = validateCodex(codex);
		if (validationErrors != null) {
			return dispatch({
				type: 'INVALID_CODEX',
				errors: validationErrors,
			});
		}

		const method = codex.pid === '' ?
			'post' :
			'put';

		dispatch({ type: 'SAVE_CODEX' });

		return xhr({
			body: JSON.stringify(parseOutgoingCodex(codex)),
			headers: { ...DEFAULT_HEADERS, ...{
				Authorization: localStorage.getItem('hi-marschol2-auth-token'),
			} },
			method,
			url: `${codexUrl}/${codex.pid}`,
		}, (err, response) => {
			if (err) console.error(err);
			if (response.statusCode === 401) return history.push('/401');

			let id = codex.pid;

			if (response.headers.hasOwnProperty('location')) {
				const lastIndex = response.headers.location.lastIndexOf('/');
				id = response.headers.location.substr(lastIndex + 1);
			}

			dispatch({ type: 'SAVED_CODEX' });
			return dispatch(fetchCodex(id));
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
		}, (err, response) => {
			if (response.statusCode === 401) return history.push('/401');

			dispatch({
				type: 'REMOVE_CODEX',
				id: codex.pid,
			});

			return history.push('/');
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
		type: 'ADD_UNIT',
		unitType: type,
	}
);
