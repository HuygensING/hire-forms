import Immutable from "immutable";
import origin from "./origin";

export default new Immutable.Map({
	annotators: new Immutable.List(),
	bibliographies: new Immutable.List(),
	contentSummary: "",
	creationData: "",
	creator: "",
	date: "",
	dateAndLocaleRemarks: "",
	dateSource: "",
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
	modificationData: "",
	modifier: "",
	name: "",
	origin: origin,
	pageDimensionHeight: null,
	pageDimensionWidth: null,
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