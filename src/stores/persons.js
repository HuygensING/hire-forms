Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	all: new Immutable.List()
	current: new Immutable.Map()

const CHANGE_EVENT = "change";

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
		data = data.map (person) ->
			key: person.id
			value: person.label

		_model = _model.set "all", Immutable.fromJS(data)

	_onReceive: (data) ->
		index = _model.get("all").findIndex (entry) ->
			entry.get("key") is "/persons/#{data.pid}"


		_model = _model.mergeIn ["all", index], data

		console.log _model.getIn(["all", index])

		_model = _model.set "current", _model.getIn(["all", index])

	_onUpdate: (data) ->
		data.value = data.name
		console.log data
		@_onReceive data

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when "PERSONS_RECEIVE_ALL"
			persons._onReceiveAll payload.action.data
		when "PERSONS_RECEIVE"
			persons._onReceive payload.action.data
		when "PERSONS_UPDATE"
			persons._onUpdate payload.action.data
		else
			return

	persons.emit CHANGE_EVENT

persons = new Persons()
persons.dispatcherIndex = dispatcher.register dispatcherCallback

window.persons = persons
module.exports = persons