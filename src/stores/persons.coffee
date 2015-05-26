Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	all: new Immutable.List()
	current: new Immutable.Map()
	
CHANGE_EVENT = "change"

class Persons extends EventEmitter
	getState: ->
		_model
	
	listen: (callback) ->
		@addListener CHANGE_EVENT, callback

	stopListening: (callback) ->
		@removeListener CHANGE_EVENT, callback

	_set: (key, value) ->
		unless Array.isArray key
			key = [key]

		_model = _model.setIn key, value

	_delete: (key) ->
		_model = _model.deleteIn(key)

	_onReceiveAll: (data) ->
		reducer = (map, curr) ->
			# Cut the path from the ID (/persons/PER001 => PER001)
			key = curr.id.substr(9)

			# Add the person to the map
			map[key] = curr.label

			# Return the map for the next iteration
			map

		data = data.reduce reducer, {}

		_model = _model.set "all", new Immutable.Map(data)

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when "PERSONS_RECEIVE_ALL"
			persons._onReceiveAll payload.action.data
		else
			return

	persons.emit CHANGE_EVENT

persons = new Persons()
persons.dispatcherIndex = dispatcher.register dispatcherCallback

window.persons = persons
module.exports = persons