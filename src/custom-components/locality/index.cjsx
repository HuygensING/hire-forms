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
		@props.onChange @props.values.set("region", value)

		for region in @props.options.get("tree").regions
			if region.name is value
				places = region.places.map (place) -> place.name
				@setState
					places: new Immutable.List(places)

	_handlePlaceChange: (value) =>
		@props.onChange @props.values.set("place", value)

	_handleScriptoriumChange: (value) =>

	# _handleButtonClick: (ev) =>
	# 	@setState
	# 		visible: !@state.visible

	# _handleListClick: (index, ev) =>
	# 	@setState
	# 		visible: false

	# 	@props.onChange @props.options.get(index)

module.exports = Locality