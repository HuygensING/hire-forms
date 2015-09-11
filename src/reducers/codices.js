import Immutable from "immutable";
// import {parseIncomingCodex} from "../stores/parsers/codex";

function castArray(arr) {
	return (Array.isArray(arr)) ? arr : [arr];
}

let MODEL = {
	annotators: [],
	bibliographies: [],
	contentSummary: "",
	creationData: "",
	creator: "",
	date: "",
	dateAndLocaleRemarks: "",
	dateSource: "",
	donors: [],
	examinationLevel: "",
	folia: null,
	identifiers: [],
	interestingFor: [],
	layoutRemarks: "",
	locations: [],
	marginUnits: [],
	marginalQuantities: {
		firstPagesConsidered: null,
		firstPagesWithMarginals: null,
		mostFilledPageDesignation: "",
		mostFilledPagePctage: null,
		totalBlankPages: null
	},
	marginalsSummary: "",
	modificationData: "",
	modifier: "",
	name: "",
	origin: {
		certain: false,
		locality: {},
		remarks: ""
	},
	pageDimensionHeight: null,
	pageDimensionWidth: null,
	pageLayouts: [],
	patrons: [],
	pid: "",
	provenances: [],
	quireStructure: "",
	script: {
		additionalRemarks: "",
		characteristics: "",
		handsCount: "",
		handsRange: "",
		scribeRemarks: "",
		scribes: [],
		types: [],
		typesRemarks: ""
	},
	textUnits: [],
	thumbnailInfo: "",
	userRemarks: "",
	URLs: []
};

let initialState = {
	all: [],
	current: MODEL,
	requesting: false
};

export default function(state=initialState, action) {
	let current, key;

	switch (action.type) {
		case "REQUEST_CODEX":
			return {...state, ...{requesting: true}};

		case "RECEIVE_CODEX":
			// let parsedCodex = parseIncomingCodex(action.response);

			return {...state, ...{
				all: [...state.all, action.response],
				current: action.response,
				requesting: false
			}};

		case "SET_CODEX_KEY":
			current = Immutable.fromJS(state.current);
			key = castArray(action.key);

			return {...state, ...{
				current: current.setIn(key, action.value).toJS()
			}};

		case "SET_CURRENT_CODEX":
			return {...state, ...{
				current: action.current
			}};

		case "DELETE_CODEX_KEY":
			current = Immutable.fromJS(state.current);
			key = castArray(action.key);

			return {...state, ...{
				current: current.deleteIn(key).toJS()
			}};

		case "CODEX_DELETED":
			return {...state, ...{
				all: state.all.filter((codex) => codex._id !== action.id),
				current: MODEL
			}};

		case "NEW_CODEX":
			return {...state, ...{
				current: MODEL
			}};

		default:
			return state;
	}
}