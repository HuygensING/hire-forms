const personModel = {
	person: "",
	certain: false,
	pages: "",
	remarks: ""
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

const dateAndLocalityModel = {
	"date": "",
	"dateSource": "",
	"locality": {},
	"remarks": "",
	"certain": false
}

const textUnitModel = {
	"excipit": "",
	"incipit": "",
	"pages": "",
	"remarks": "",
	"stateOfPreservation": "",
	"text": [],
	"titleInCodex": ""
};

// const originModel = {
// 	certain: false,
// 	locality: {},
// 	remarks: ""
// };

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

export {personModel, layoutModel, dateAndLocalityModel, textUnitModel, marginUnitModel};