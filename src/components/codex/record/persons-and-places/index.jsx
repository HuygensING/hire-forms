import React, { PropTypes } from 'react';
import Well from 'src/components/well';

const toObject = (type) => (person) => ({
	name: person.person.value,
	type: [type],
});

const flatten = (prev, curr) => prev.concat(curr);
const foldOnType = (prev, curr) => {
	const found = prev.find((person) => person.name === curr.name);

	if (found == null) {
		prev.push(curr);
	} else if (found.type.indexOf(curr.type[0]) === -1) {
		found.type.push(curr.type);
	}

	return prev;
};

const uniqueId = (prev, curr) => {
	const found = prev.find((obj) => obj.id === curr.id);

	if (found == null) {
		prev.push(curr);
	}

	return prev;
};

const extractPersons = (codex) => {
	const annotators = codex.marginUnits
		.map((marginUnit) => marginUnit.annotators)
		.reduce(flatten, []);

	const authors = codex.textUnits
		.map((textUnit) => textUnit.text.authors)
		.reduce(flatten, []);

	return [
		annotators.map(toObject('annotator')), authors.map(toObject('author')),
		codex.annotators.map(toObject('annotator')),
		codex.donors.map(toObject('donor')),
		codex.patrons.map(toObject('patron')),
		codex.script.scribes.map(toObject('scribe')),
	]
		.reduce(flatten, [])
		.reduce(foldOnType, []);
};

const extractPlaces = (codex) => {
	const marginUnits = codex.marginUnits
		.filter((marginUnit) => marginUnit.hasOwnProperty('origin'))
		.map((marginUnit) => marginUnit.origin.locality);

	const provenances = codex.provenances.map((prov) =>
		prov.locality
	);

	const localities = [codex.origin.locality].concat(marginUnits, provenances);

	return localities.reduce(uniqueId, []);
};

const PersonsAndPlaces = ({ codex }) =>
	<div className="persons-and-places">
		<Well title="Persons">
			<ul>
				{extractPersons(codex).map((person, index) =>
					<li key={index}>
						{person.name}
						<small> ({person.type.join(', ')})</small>
					</li>
				)}
			</ul>
		</Well>
		<Well title="Places">
			<ul>
				{extractPlaces(codex).map((locality, index) =>
					<li key={index}>{locality.region}, {locality.place}, {locality.scriptorium}</li>
				)}
			</ul>
		</Well>
	</div>;

PersonsAndPlaces.propTypes = {
	codex: PropTypes.object,
};

export default PersonsAndPlaces;
