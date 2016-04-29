const defaultArray = [];
const defaultString = '';
const defaultNumber = null;
const defaultBoolean = false;

const localityModel = {
	id: defaultString,
	place: defaultString,
	region: defaultString,
	scriptorium: defaultString,
};

const originModel = {
	locality: localityModel,
	remarks: defaultString,
	certain: defaultBoolean,
};

const dateAndLocalityModel = Object.assign({}, originModel, {
	'^locality': null,
	date: defaultString,
	dateInfo: defaultString,
});

const codexModel = {
	annotators: defaultArray,
	bibliographies: defaultArray,
	contentSummary: defaultString,
	creator: defaultString,
	date: defaultString,
	dateAndLocaleRemarks: defaultString,
	dateSource: defaultString,
	donors: defaultArray,
	examinationLevel: defaultString,
	folia: defaultNumber,
	identifiers: defaultArray,
	interestingFor: defaultArray,
	layoutRemarks: defaultString,
	locations: defaultArray,
	marginUnits: defaultArray,
	marginalQuantities: {
		firstPagesConsidered: defaultNumber,
		firstPagesWithMarginals: defaultNumber,
		mostFilledPageDesignation: defaultString,
		mostFilledPagePctage: defaultNumber,
		totalBlankPages: defaultNumber,
	},
	marginalsSummary: defaultString,
	modifier: defaultString,
	name: defaultString,
	origin: originModel,
	pageDimensionHeight: defaultNumber,
	pageDimensionWidth: defaultNumber,
	pageLayouts: defaultArray,
	patrons: defaultArray,
	pid: defaultString,
	provenances: defaultArray,
	quireStructure: defaultString,
	script: {
		additionalRemarks: defaultString,
		characteristics: defaultString,
		handsCount: defaultString,
		handsRange: defaultString,
		scribeRemarks: defaultString,
		scribes: defaultArray,
		types: defaultArray,
		typesRemarks: defaultString,
	},
	textUnits: defaultArray,
	thumbnailInfo: defaultString,
	userRemarks: defaultArray,
	URLs: defaultArray,
};

const identifierModel = {
	identifier: defaultString,
	type: defaultString,
};

const layoutModel = {
	blockHeights: defaultString,
	columnWidths: defaultString,
	foliaCount: defaultString,
	linesMin: defaultString,
	linesMax: defaultString,
	lineHeight: defaultString,
	pages: defaultString,
	remarks: defaultString,
	textHeightMax: defaultNumber,
	textHeightMin: defaultNumber,
	textWidthMax: defaultNumber,
	textWidthMin: defaultNumber,
};

const locationModel = {
	institute: defaultString,
	pages: defaultString,
	shelfmark: defaultString,
};

const marginTypeModel = {
	type: defaultString,
	quantification: defaultString,
	remarks: defaultString,
};

const specificPhenomenaModel = marginTypeModel;

const marginUnitModel = {
	annotators: defaultArray,
	bibliographies: defaultArray,
	date: defaultString,
	functionalAspects: defaultString,
	generalObservations: defaultString,
	handCount: defaultString,
	identifier: defaultString,
	languages: defaultArray,
	marginTypes: defaultArray,
	origin: originModel,
	pages: defaultString,
	relativeDate: defaultString,
	scriptTypes: defaultArray,
	scriptsRemarks: defaultString,
	specificPhenomena: defaultArray,
	typologyRemarks: defaultString,
};

const personModel = {
	person: defaultString,
	certain: defaultBoolean,
	pages: defaultString,
	remarks: defaultString,
};

const textUnitModel = {
	explicit: defaultString,
	incipit: defaultString,
	pages: defaultString,
	remarks: defaultString,
	stateOfPreservation: defaultString,
	stateOfPreservationRemarks: defaultString,
	text: {
		key: defaultString,
		value: defaultString,
	},
	titleInCodex: defaultString,
};

export {
	codexModel,
	dateAndLocalityModel,
	identifierModel,
	layoutModel,
	locationModel,
	marginTypeModel,
	marginUnitModel,
	personModel,
	specificPhenomenaModel,
	textUnitModel,
};
