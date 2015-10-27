import React from "react";
import Well from "../../well";
import Text from "./elements/text";
import Locality from "./elements/locality";
import Layout from "./elements/layout";
import R from "ramda";

class PersonsAndPlaces extends React.Component {
	extractPersons() {
		let codex = this.props.codices.current;

		let annotators = codex.marginUnits.map((marginUnit) =>
			marginUnit.annotators
		);

		let authors = codex.textUnits.map((textUnit) =>
			textUnit.text.authors
		);

		let persons = [].concat(
			annotators,
			authors,
			codex.annotators,
			codex.donors,
			codex.patrons,
			codex.script.scribes
		);

		persons = persons
			.reduce((prev, curr) => {
				return prev.concat(curr);
			}, [])
			.map((person) =>
				person.person.value
			)

		return R.uniq(persons);
	}

	extractPlaces() {
		let codex = this.props.codices.current;

		let marginUnits = codex.marginUnits
			.map((marginUnit) =>
				marginUnit.hasOwnProperty("origin") ?
					marginUnit.origin.locality.id :
					null
			)
			.filter((locality) =>
				locality != null
			);

		let provenances = codex.provenances.map((prov) =>
			prov.locality.id
		)

		let places = provenances.concat(
			marginUnits,
			codex.origin.locality.id
		);

		return R.uniq(places);
	}

	render() {
		return (
			<div className="persons-and-places">
				<Well title="Persons">
					<ul>
						{this.extractPersons().map((personName, index) =>
							<li key={index}>{personName}</li>
						)}
					</ul>
				</Well>
				<Well title="Places">
					<ul>
						{this.extractPlaces().map((placeName, index) =>
							<li key={index}>{placeName}</li>
						)}
					</ul>
				</Well>
			</div>
		);
	}
}

PersonsAndPlaces.propTypes = {
	codices: React.PropTypes.object
}

export default PersonsAndPlaces;