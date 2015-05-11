React = require 'react'
Immutable = require "immutable"
extend = require "extend"

Input = require "./components/input"
MutableList = require "./components/mutable-list"

marginUnit = require "./stores/margin-unit"
formActions = require "./actions/form"

MultiForm = require "./multi-form"
# BeheerderForm = require "./beheerder"

class MarginUnit extends React.Component
	@propTypes =
		onChange: React.PropTypes.func.isRequired
		value: React.PropTypes.instanceOf(Immutable.Map)

	render: ->
		model = @props.value

		<ul>
			<li>
				<label>Naam</label>
				<Input
					value={model.get("naam")}
					onChange={@_handleElementChange.bind(@, "naam")} />
			</li>
			<li>
				<label>Adres</label>
				<ul>
					<li>
						<label>Straat</label>
						<Input
							value={model.getIn(["adres", "straat"])}
							onChange={@_handleElementChange.bind(@, ["adres", "straat"])} />
					</li>
					<li>
						<label>Huisnummer</label>
						<Input
							value={model.getIn(["adres", "huisnummer"])}
							onChange={@_handleElementChange.bind(@, ["adres", "huisnummer"])} />
					</li>
					<li>
						<label>Postcode</label>
						<Input
							value={model.getIn(["adres", "postcode"])}
							onChange={@_handleElementChange.bind(@, ["adres", "postcode"])} />
					</li>
				</ul>
			</li>
			<li>
				<label>Beheerders</label>
				<MultiForm
					attr={"beheerders"}
					value={model.get("beheerders")}
					view={BeheerderForm}
					onChange={@_handleElementChange} />
			</li>
		</ul>

	_handleElementChange: (key, value, index) =>
		@props.onChange key, value

module.exports = MarginUnit