// TODO Turn model into Record
// TODO Remove uncamel cased vars

import Immutable from "immutable";
import {EventEmitter} from "events";

import dispatcher from "../dispatcher";


let model = new Immutable.Map({
	annotators: new Immutable.List(),
	bibliographies: new Immutable.List(),
	contentSummary: "",
	date: "",
	dateAndLocaleRemarks: "",
	date_source: "",
	donors: new Immutable.List(),
	examinationLevel: "",
	folia: null,
	identifiers: new Immutable.List(),
	interestingFor: new Immutable.List(),
	layoutRemarks: "",
	locations: new Immutable.List(),
	marginUnits: new Immutable.List(),
	marginalQuantities: new Immutable.Map({
		firstPagesConsidered: null,
		firstPagesWithMarginals: null,
		mostFilledPageDesignation: "",
		mostFilledPagePctage: null,
		totalBlankPages: null
	}),
	marginalsSummary: "",
	name: "",
	origin: new Immutable.Map({
		certain: false,
		locality: new Immutable.Map(),
		remarks: ""
	}),
	pageDimension_height: null,
	pageDimension_width: null,
	pageLayouts: new Immutable.List(),
	patrons: new Immutable.List(),
	pid: "",
	provenances: new Immutable.List(),
	quireStructure: "",
	script: new Immutable.Map({
		additionalRemarks: "",
		characteristics: "",
		handsCount: "",
		handsRange: "",
		scribeRemarks: "",
		scribes: new Immutable.List(),
		types: new Immutable.List(),
		typesRemarks: ""
	}),
	textUnits: new Immutable.List(),
	thumbnailInfo: "",
	userRemarks: "",
	URLs: new Immutable.List()
});

const CHANGE_EVENT = "change";

class Codex extends EventEmitter {
	getState() {
		return model;
	}

	listen(callback) {
		this.addListener(CHANGE_EVENT, callback);
	}

	stopListening(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	set(key, value) {
		if (!Array.isArray(key)) {
			key = [key];
		}

		if (Array.isArray(value)) {
			value = new Immutable.List(value);
		}

		model = model.setIn(key, value);
	}

	delete(key) {
		model = model.deleteIn(key);
	}
}

let codex = new Codex();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "CODEX_SET":
			codex.set(payload.action.key, payload.action.value);
			break;
		case "CODEX_DELETE":
			codex.delete(payload.action.key);
			break;
		default:
			return;
	}

	codex.emit(CHANGE_EVENT);
};

codex.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default codex;