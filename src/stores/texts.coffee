Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	all: new Immutable.List()
	current: new Immutable.Map()
	
CHANGE_EVENT = "change"

class Texts extends EventEmitter
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
		data = data.map (text) ->
			key: text.id
			value: text.label

		_model = _model.set "all", new Immutable.List(data)

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when "TEXTS_RECEIVE_ALL"
			texts._onReceiveAll payload.action.data
		else
			return

	texts.emit CHANGE_EVENT

texts = new Texts()
texts.dispatcherIndex = dispatcher.register dispatcherCallback

window.texts = texts
module.exports = texts