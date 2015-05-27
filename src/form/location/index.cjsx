React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
Select = require "../../components/select"

{FORM} = require "../../constants"

class Location extends Form
	@defaultProps =
		institute: ""
		shelfmark: ""
		pages: ""

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Institute</label>
				<Select
					value={model.get("institute")}
					options={["München, Bayerische Staatsbibliothek", "Paris, Bibliothèque nationale de France", "Vatican City, Bibliotheca Apostolica Vaticana", "Leiden, Universiteitsbibliotheek", "Bern, Burgerbibliothek", "Wien, Österreichische Nationalbibliothek", "Amiens,  Bibliothèque municipale", "Heidelberg, Universitätsbibliothek", "Bad Homburg, Verwaltung der Staatlichen Schlösser und Gärten Hessen", "Bamberg, Staatsbibliothek", "Darmstadt, Universitäts- und Landesbibliotek", "Florence, Bibliotheca Medicea Laurenziana", "Inc. 2o 9600 (fragm.", "Karlsruhe, Badische Hof- und Landesbibliotek", "Kiel, Universitätsbibliothek", "New York, Pierpont Morgan Library", "Stuttgart, Württembergische Landesbibliothek", "Wolfenbuettel, Herzog August Bibliothek", "Würzburg, Universitätsbibliothek"]}
					onChange={@_handleChange.bind(@, "institute")} />
			</li>
			<li>
				<label>Type</label>
				<Input
					value={model.get("shelfmark")}
					onChange={@_handleChange.bind(@, "shelfmark")} />
			</li>
			<li>
				<label>Identifier</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
		</ul>

module.exports = Location