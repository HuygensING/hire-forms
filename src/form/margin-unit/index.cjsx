React = require 'react'
Immutable = require "immutable"
cx = require "classnames"

Form = require "../base"
MultiForm = require "../multi"

# FORM COMPONENTS
Input = require "../../components/input"
SelectList = require "../../components/select-list"
MutableList = require "../../components/mutable-list"

# FORMS
Locality = require "../locality"
Person = require "../person"

{FORM} = require "../../constants"

class MarginUnit extends Form
	@defaultProps =
		identifier: ""
		pages: ""
		date: ""
		relativeDate: ""
		origin: new Immutable.List()
		language: new Immutable.List()
		script: new Immutable.List()
		annotators: new Immutable.List()
		annotationTypes: new Immutable.List()
		typologyRemarks: ""
		specificPhenomena: new Immutable.List()
		functionalAspects: ""
		generalObservations: ""
		bibliography: new Immutable.List()

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>Identifier</label>
				<Input
					value={model.get("identifier")}
					onChange={@_handleChange.bind(@, "identifier")} />
			</li>
			<li>
				<label>Pages</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
			<li>
				<label>Relative date</label>
				<Input
					value={model.get("relativeDate")}
					onChange={@_handleChange.bind(@, "relativeDate")} />
			</li>
			<li className="well">
				<label>Origin</label>
				<Locality
					attr={"origin"}
					value={model.get("origin")}
					onChange={@_handleChange} />
			</li>
			<li>
				<label>Language</label>
				<SelectList
					value={model.get("languages")}
					onChange={@_handleChange.bind(@, "languages")} />
			</li>
			<li>
				<label>Script</label>
				<SelectList
					value={model.get("scripts")}
					onChange={@_handleChange.bind(@, "scripts")} />
			</li>
			<li>
				<label>Script remarks</label>
				<Input
					value={model.get("scriptRemarks")}
					onChange={@_handleChange.bind(@, "scriptRemarks")} />
			</li>
			<li className={cx(well: model.get("annotators").size)}>
				<label>Annotators</label>
				<MultiForm
					attr={"annotators"}
					value={model.get("annotators")}
					view = {Person}
					onChange={@_handleChange}
					onDelete={@_handleDelete} />
			</li>
			<li>
				<label>Typology remarks</label>
				<Input
					value={model.get("typologyRemarks")}
					onChange={@_handleChange.bind(@, "typologyRemarks")} />
			</li>
			<li>
				<label>Functional aspects</label>
				<Input
					value={model.get("functionalAspects")}
					onChange={@_handleChange.bind(@, "functionalAspects")} />
			</li>
			<li>
				<label>General observations</label>
				<Input
					value={model.get("generalObservations")}
					onChange={@_handleChange.bind(@, "generalObservations")} />
			</li>
			<li>
				<label>Bibliography</label>
				<MutableList
					value={model.get("bibliography")}
					onChange={@_handleChange.bind(@, "bibliography")} />
			</li>
		</ul>

module.exports = MarginUnit