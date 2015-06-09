import Immutable from "immutable";
import origin from "./origin";

export default new Immutable.Map({
	annotators: new Immutable.List(),
	bibliographies: new Immutable.List(),
	date: "",
	functionalAspects: "",
	generalObservations: "",
	handCount: "",
	identifier: "",
	languages: new Immutable.List(),
	marginTypes: new Immutable.List(),
	origin: origin,
	pages: "",
	relativeDate: "",
	scriptTypes: new Immutable.List(),
	scriptsRemarks: "",
	specificPhenomena: new Immutable.List(),
	typologyRemarks: ""
});