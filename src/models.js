const localityModel = {
	id: "",
	place: "",
	region: "",
	scriptorium: ""
};

const dateAndLocalityModel = {
	"date": "",
	"dateSource": "",
	"locality": localityModel,
	"remarks": "",
	"certain": false
}

const codexModel = {
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
	origin: dateAndLocalityModel,
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

const identifierModel = {
	identifier: "",
	type: ""
}

const layoutModel = {
	textWidthMin: "",
	textWidthMax: "",
	textHeightMin: "",
	textHeightMax: "",
	horizontalLayout: "",
	verticalLayout: "",
	linesMin: "",
	linesMax: "",
	lineHeight: "",
	foliaCount: "",
	pages: "",
	remarks: ""
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
	origin: dateAndLocalityModel,
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