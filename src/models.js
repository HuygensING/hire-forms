const localityModel = {
	id: "",
	place: "",
	region: "",
	scriptorium: ""
};

const originModel = {
	"locality": localityModel,
	"remarks": "",
	"certain": false
}

const dateAndLocalityModel = Object.assign({}, originModel, {
	"date": "",
	"dateSource": ""
});

const codexModel = {
	annotators: [],
	bibliographies: [],
	contentSummary: "",
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
	modifier: "",
	name: "",
	origin: originModel,
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
	userRemarks: [],
	URLs: []
};

const identifierModel = {
	identifier: "",
	type: ""
}

const layoutModel = {
	blockHeights: [],
	columnWidths: [],
	foliaCount: "",
	linesMin: "",
	linesMax: "",
	lineHeight: "",
	pages: "",
	remarks: "",
	textWidthMin: "",
	textWidthMax: "",
	textHeightMin: "",
	textHeightMax: ""
	// horizontalLayout: "",
	// verticalLayout: "",
}


const locationModel = {
	institute: "",
	pages: "",
	shelfmark: ""
}

const marginTypeModel = {
	type: "",
	quantification: "",
	remarks: ""
}

const specificPhenomenaModel = marginTypeModel;

const marginUnitModel = {
	annotators: [],
	bibliographies: [],
	date: "",
	functionalAspects: "",
	generalObservations: "",
	handCount: "",
	identifier: "",
	languages: [],
	marginTypes: [],
	origin: originModel,
	pages: "",
	relativeDate: "",
	scriptTypes: [],
	scriptsRemarks: "",
	specificPhenomena: [],
	typologyRemarks: ""
};

const personModel = {
	person: "",
	certain: false,
	pages: "",
	remarks: ""
}

const textUnitModel = {
	"excipit": "",
	"incipit": "",
	"pages": "",
	"remarks": "",
	"stateOfPreservation": "",
	"text": {
		key: "",
		value: ""
	},
	"titleInCodex": ""
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
	textUnitModel
};