React = require 'react/addons'

codex = require "./stores/codex"

Input = require "./components/input"
Autocomplete = require "./components/autocomplete"
MutableList = require "./components/mutable-list"

codexActions = require "./actions/codex"

class Form extends React.Component
	constructor: (props) ->
		super props

		@state = 
			codex: codex.getState()

	componentDidMount: ->
		codex.listen @_handleCodexChange
	
	componentWillUnmount: ->
		codex.stopListening @_handleCodexChange

	shouldComponentUpdate: (nextProps, nextState) ->
		@state.codex isnt nextState.codex
	
	render: ->
		model = @state.codex

		<form>
			<ul>
				<li>
					<label>Huis</label>
					<Input
						value={model.get("huis")}
						onChange={@_onElementChange.bind(@, "huis")} />
				</li>
				<li>
					<label>Huisgenoten</label>
					<MutableList
						values={model.get("huisgenoten")}
						editable={true}
						onChange={@_onElementChange.bind(@, "huisgenoten")} />
				</li>
				<li>
					<label>Familieleden</label>
					<MutableList
						values={model.get("familieleden")}
						onChange={@_onElementChange.bind(@, "familieleden")} />
				</li>
				<li>
					<label>Locatie</label>
					<ul>
						<li>
							<label>Sporthallen</label>
							<MutableList
								values={model.getIn(["locatie", "sporthallen"])}
								onChange={@_onElementChange.bind(@, ["locatie", "sporthallen"])} />
						</li>
						<li>
							<label>Stad</label>
							<Input
								value={model.getIn(["locatie", "stad"])}
								onChange={@_onElementChange.bind(@, ["locatie", "stad"])} />
						</li>
						<li>
							<label>Provincie</label>
							<Input
								value={model.getIn(["locatie", "provincie"])}
								onChange={@_onElementChange.bind(@, ["locatie", "provincie"])} />
						</li>
						<li>
							<label>Land</label>
							<Input
								value={model.getIn(["locatie", "land"])}
								onChange={@_onElementChange.bind(@, ["locatie", "land"])} />
						</li>
					</ul>
				</li>
			</ul>
		</form>

	_onElementChange: (key, value) =>
		codexActions.update key, value

	_handleCodexChange: =>
		@setState
			codex: codex.getState()

module.exports = Form