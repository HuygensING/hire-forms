React = require 'react'
Immutable = require "immutable"

Input = require "./components/input"

class Beheerder extends React.Component
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
		</ul>

	_handleElementChange: (key, value) =>
		@props.onChange key, value

module.exports = Beheerder