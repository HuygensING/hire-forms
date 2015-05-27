React = require 'react'
Immutable = require "immutable"

Form = require "../base"

Input = require "../../components/input"
SelectList = require "../../components/select-list"

texts = require "../../stores/texts"
textsActions = require "../../actions/texts"

{FORM} = require "../../constants"

class TextUnit extends Form
	@defaultProps =
		text: new Immutable.List()
		titleInCodex: ""
		incipit: ""
		excipit: ""
		pages: ""
		stateOfPreservation: ""
		remarks: ""

	constructor: (props) ->
		super props

		@state = 
			texts: texts.getState()

	componentDidMount: ->
		textsActions.getAllTexts()

		texts.listen @_handleStoreChange
	
	componentWillUnmount: ->
		texts.stopListening @_handleStoreChange

	render: ->
		model = @props.value

		<ul className={FORM}>
			<li>
				<label>text</label>
				<SelectList
					values={model.get("text").toArray()}
					options={@state.texts.get("all").toArray()}
					onChange={@_handleChange.bind(@, "text")} />
			</li>
			<li>
				<label>Title in codex</label>
				<Input
					value={model.get("titleInCodex")}
					onChange={@_handleChange.bind(@, "titleInCodex")} />
			</li>
			<li>
				<label>Incipit</label>
				<Input
					value={model.get("incipit")}
					onChange={@_handleChange.bind(@, "incipit")} />
			</li>
			<li>
				<label>Excipit</label>
				<Input
					value={model.get("excipit")}
					onChange={@_handleChange.bind(@, "excipit")} />
			</li>
			<li>
				<label>Pages</label>
				<Input
					value={model.get("pages")}
					onChange={@_handleChange.bind(@, "pages")} />
			</li>
			<li>
				<label>State of preservation</label>
				<Input
					value={model.get("stateOfPreservation")}
					onChange={@_handleChange.bind(@, "stateOfPreservation")} />
			</li>
			<li>
				<label>Remarks</label>
				<Input
					value={model.get("remarks")}
					onChange={@_handleChange.bind(@, "remarks")} />
			</li>
		</ul>

	_handleStoreChange: =>
		@setState
			texts: texts.getState()

module.exports = TextUnit