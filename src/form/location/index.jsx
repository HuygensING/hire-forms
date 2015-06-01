import React from "react";
import Immutable from "immutable";

import Form from "../base";

import Input from "../../components/input";
import Select from "../../components/select";

import {FORM} from "../../constants";

class Location extends Form {
	this.defaultFormProps =
		institute: ""
		shelfmark: ""
		pages: ""

	render() {
		model = this.props.value

		<ul className={FORM}>
			<li>
				<label>Institute</label>
				<Select
					value={model.get("institute")}
					options={["München, Bayerische Staatsbibliothek", "Paris, Bibliothèque nationale de France", "Vatican City, Bibliotheca Apostolica Vaticana", "Leiden, Universiteitsbibliotheek", "Bern, Burgerbibliothek", "Wien, Österreichische Nationalbibliothek", "Amiens,  Bibliothèque municipale", "Heidelberg, Universitätsbibliothek", "Bad Homburg, Verwaltung der Staatlichen Schlösser und Gärten Hessen", "Bamberg, Staatsbibliothek", "Darmstadt, Universitäts- und Landesbibliotek", "Florence, Bibliotheca Medicea Laurenziana", "Inc. 2o 9600 (fragm.", "Karlsruhe, Badische Hof- und Landesbibliotek", "Kiel, Universitätsbibliothek", "New York, Pierpont Morgan Library", "Stuttgart, Württembergische Landesbibliothek", "Wolfenbuettel, Herzog August Bibliothek", "Würzburg, Universitätsbibliothek"]}
					onChange={this.handleChange.bind(this, "institute")} />
			</li>
			<li>
				<label>Type</label>
				<Input
					value={model.get("shelfmark")}
					onChange={this.handleChange.bind(this, "shelfmark")} />
			</li>
			<li>
				<label>Identifier</label>
				<Input
					value={model.get("pages")}
					onChange={this.handleChange.bind(this, "pages")} />
			</li>
		</ul>

}

export default Location;