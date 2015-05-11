# Immutable = require 'immutable'
# EventEmitter = require('events').EventEmitter

# dispatcher = require '../dispatcher'

# _model = new Immutable.Map
# 	naam: "'t Zandje"
# 	adres: "Wielerkade 449"
	
# CHANGE_EVENT = "change"

# class MarginUnit extends EventEmitter
# 	getState: ->
# 		_model
	
# 	listen: (callback) ->
# 		@addListener CHANGE_EVENT, callback

# 	stopListening: (callback) ->
# 		@removeListener CHANGE_EVENT, callback

# 	_update: (key, value) ->
# 		if Array.isArray key
# 			_model = _model.setIn key, value
# 		else
# 			_model = _model.set key, value

# dispatcherCallback = (payload) ->
# 	switch payload.action.actionType
# 		when 'UPDATE_MARGIN_UNIT'
# 			marginUnit._update payload.action.key, payload.action.value
# 		else
# 			return

# 	marginUnit.emit CHANGE_EVENT

# marginUnit = new MarginUnit()
# marginUnit.dispatcherIndex = dispatcher.register dispatcherCallback

# module.exports = marginUnit