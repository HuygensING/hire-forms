React = require 'react'
Immutable = require "immutable"

Options = require "../options"

{SELECT} = require "../../constants"

cx = require "classnames"

class Select extends React.Component
	@defaultProps =
		value: ""
		options: []

	@propTypes =
		onChange: React.PropTypes.func.isRequired

		# Selected value, can be a string or an object ({key: "somekey", value: "somevalue"}).
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.shape(
				key: React.PropTypes.string
				value: React.PropTypes.string
			)
		])

		# The options, can be an array of strings or an array of objects ({key: "somekey", value: "somevalue"}).
		options: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.arrayOf(
				React.PropTypes.shape(
					key: React.PropTypes.string
					value: React.PropTypes.string
				)
			)
		])
		placeholder: React.PropTypes.string

	constructor: (props) ->
		super props

		@state =
			visible: false

	render: ->
		if @state.visible
			optionValues = if @_isListOfStrings(@props.options) then @_stringArray2KeyValueArray(@props.options) else @props.options
				
			options =
				<Options
					values=optionValues
					onChange={@_handleOptionsChange} />

		value = if @props.value is "" then @props.placeholder else @props.value

		if @_isKeyValueMap(@props.value)
			value = @props.value.value

		<div className={SELECT}>
			<div className="input-container" onClick={@_handleInputClick}>
				<div className={cx(
						"input": true
						"placeholder": @props.value is "")}>
					{value}
				</div>
				<button>▾</button>
			</div>
			{options}
		</div>

	_isListOfStrings: (list) ->
		list.length and (typeof list[0] is "string")

	_isKeyValueMap: (map) ->
		map.hasOwnProperty("key") and map.hasOwnProperty("value")

	_stringArray2KeyValueArray: (list) ->
		list.map (item) ->
			key: item
			value: item

	_handleInputClick: (ev) =>
		@setState
			visible: !@state.visible

	###
	# @method
	# @param {object} value Map of key and value: {key: "somekey", value: "somevalue"}
	###
	_handleOptionsChange: (value) =>
		@setState
			visible: false

		# If the options prop is an array of strings,
		# return a string.
		if @_isListOfStrings(@props.options)
			value = value.value

		@props.onChange value

module.exports = Select