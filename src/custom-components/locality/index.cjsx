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
				value={@props.values.get("region")}
				options={@props.options.get("regions")}
				onChange={@_handleRegionChange} />
			<Select
				value={@props.values.get("place")}
				options={@state.places}
				onChange={@_handlePlaceChange} />
			<Select
				value={@props.values.get("scriptorium")}
				options={@state.scriptoria}
				onChange={@_handleScriptoriumChange} />
		</div>

	_handleRegionChange: (value) =>
		for region in @props.options.get("tree").regions
			if region.name is value
				places = region.places.map (place) -> place.name
				@setState
					places: new Immutable.List(places)
					scriptorium: new Immutable.List()

		newValues = @props.values.set("region", value)
		newValues = newValues.set("place", "")
		newValues = newValues.set("scriptorium", "")
		
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
						newValues = @props.values.set "region", region.name
						newValues = newValues.set "place", place.name

		@props.onChange newValues.set("scriptorium", value)



	# _handleButtonClick: (ev) =>
	# 	@setState
	# 		visible: !@state.visible

	# _handleListClick: (index, ev) =>
	# 	@setState
	# 		visible: false

	# 	@props.onChange @props.options.get(index)

module.exports = Locality