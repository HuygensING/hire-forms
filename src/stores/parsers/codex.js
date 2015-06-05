let certainToBool = function(certain) {
	return (certain === "certain") ?
		true :
		false;
};

let parseTextUnits = function(textUnits) {
	textUnits = textUnits.map((textUnit) => {
		textUnit.text = {
			key: textUnit.text.pid,
			value: textUnit.text.displayName
		};

		return textUnit;
	});

	return textUnits;
};

let parseMarginUnits = function(marginUnits) {
	marginUnits = marginUnits.map((marginUnit) => {
		marginUnit.annotators = marginUnit.annotators.map((annotator) => {
			annotator.person = {
				key: annotator.person.pid,
				value: annotator.person.name
			};

			annotator.certain = certainToBool(annotator.certain);

			return annotator;
		});

		return marginUnit;
	});

	return marginUnits;
};

let parseProvenances = function(provenances) {
	provenances = provenances.map((provenance) => {
		provenance.certain = certainToBool(provenance.certain);

		return provenance;
	});

	return provenances;
};

export let parseIncomingCodex = function(data) {
	data.textUnits = parseTextUnits(data.textUnits);
	data.marginUnits = parseMarginUnits(data.marginUnits);
	data.provenances = parseProvenances(data.provenances);

	data.origin.certain = certainToBool(data.origin.certain);

	return data;
};