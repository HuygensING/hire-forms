//TODO verify type = shelfmark and identifier = pages, is that correct? Are they used?

import React from "react";
import Immutable from "immutable";

import form from "hire-forms-form";

import Input from "hire-forms-input";
import Select from "hire-forms-select";

let location = new Immutable.Map({
	institute: "",
	pages: "",
	shelfmark: ""
});

class Location extends React.Component {
// let Location = React.createClass({
// 	mixins: [HireForm],

	render() {
		let model = this.props.value;

		return (
			<ul>
				<li>
					<label>Institute</label>
					<Select
						onChange={this.props.onChange.bind(this, "institute")}
						options={["München, Bayerische Staatsbibliothek", "Paris, Bibliothèque nationale de France", "Vatican City, Bibliotheca Apostolica Vaticana", "Leiden, Universiteitsbibliotheek", "Bern, Burgerbibliothek", "Wien, Österreichische Nationalbibliothek", "Amiens,  Bibliothèque municipale", "Heidelberg, Universitätsbibliothek", "Bad Homburg, Verwaltung der Staatlichen Schlösser und Gärten Hessen", "Bamberg, Staatsbibliothek", "Darmstadt, Universitäts- und Landesbibliotek", "Florence, Bibliotheca Medicea Laurenziana", "Inc. 2o 9600 (fragm.", "Karlsruhe, Badische Hof- und Landesbibliotek", "Kiel, Universitätsbibliothek", "New York, Pierpont Morgan Library", "Stuttgart, Württembergische Landesbibliothek", "Wolfenbuettel, Herzog August Bibliothek", "Würzburg, Universitätsbibliothek"]}
						value={model.institute} />
				</li>
				<li>
					<label>Type</label>
					<Input
						onChange={this.props.onChange.bind(this, "shelfmark")}
						value={model.shelfmark} />
				</li>
				<li>
					<label>Identifier</label>
					<Input
						onChange={this.props.onChange.bind(this, "pages")}
						value={model.pages} />
				</li>
			</ul>
		);
	}
}

export default form(Location);