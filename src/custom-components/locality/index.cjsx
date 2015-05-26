React = require 'react'
Immutable = require "immutable"

Select = require "../../components/select"

class Locality extends React.Component
	@defaultProps =
		values: new Immutable.Map()
		options: new Immutable.List()

	@propTypes =
		onChange: React.PropTypes.func.isRequired
		values: React.PropTypes.instanceOf(Immutable.Map)
		options: React.PropTypes.instanceOf(Immutable.Map)

	constructor: (props) ->
		super props

		@state =
			places: @props.options.get("places")
			scriptoria: @props.options.get("scriptoria")

	render: ->
		<div className="hire-locality">
			<Select
				placeholder="Region"
				value={@props.values.get("region")}
				options={@props.options.get("regions").toArray()}
				onChange={@_handleRegionChange} />
			<Select
				placeholder="Place"
				value={@props.values.get("place")}
				options={@state.places.toArray()}
				onChange={@_handlePlaceChange} />
			<Select
				placeholder="Scriptorium"
				value={@props.values.get("scriptorium")}
				options={@state.scriptoria.toArray()}
				onChange={@_handleScriptoriumChange} />
		</div>

	_handleRegionChange: (value) =>
		for region in @props.options.get("tree").regions
			if region.name is value
				pluckNames = (prev, next) ->
					prev.concat next.name

				pluckScriptoria = (prev, next) ->
					prev.concat next.scriptoria.reduce pluckNames, []

				places = region.places.reduce pluckNames, []
				scriptoria = region.places.reduce pluckScriptoria, []

		@setState
			places: new Immutable.List(places)
			scriptoria: new Immutable.List(scriptoria)

		newValues = @props.values.withMutations (map) ->
			map.set("region", value).set("place", "").set("scriptorium", "")
		
		@props.onChange newValues

	_handlePlaceChange: (value) =>
		for region in @props.options.get("tree").regions
			for place in region.places
				if place.name is value
					newValues = @props.values.set("region", region.name)

					scriptoria = place.scriptoria.map (scriptorium) -> scriptorium.name

					@setState
						scriptoria: new Immutable.List(scriptoria)

		newValues = newValues.set "scriptorium", ""
		@props.onChange newValues.set("place", value)

	_handleScriptoriumChange: (value) =>
		for region in @props.options.get("tree").regions
			for place in region.places
				for scriptorium in place.scriptoria
					if scriptorium.name is value
						@props.onChange @props.values.withMutations (map) ->
							map.set("region", region.name)
								.set("place", place.name)
								.set("scriptorium", value)

module.exports = Locality