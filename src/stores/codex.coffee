Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	huis: "Wuivend Gras"
	huisgenoten: new Immutable.List ["Rien", "Proop"]
	familieleden: new Immutable.List ["Jaap", "Marie"]
	locatie: new Immutable.Map
		sporthallen: new Immutable.List()
		stad: "Den Haag"
		provincie: "Zuid-Holland"
		land: "Nederland"

	
CHANGE_EVENT = "change"

class Codex extends EventEmitter
	getState: ->
		_model
	
	listen: (callback) ->
		@addListener CHANGE_EVENT, callback

	stopListening: (callback) ->
		@removeListener CHANGE_EVENT, callback

	_update: (key, value) ->
		if Array.isArray key
			_model = _model.setIn key, value
		else
			_model = _model.set key, value

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when 'UPDATE_CODEX'
			codex._update payload.action.key, payload.action.value
		else
			return

	codex.emit CHANGE_EVENT

codex = new Codex()
codex.dispatcherIndex = dispatcher.register dispatcherCallback

window.codex = codex
module.exports = codex