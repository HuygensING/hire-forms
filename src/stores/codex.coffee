Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	annotators: new Immutable.List()
	bibliographies: new Immutable.List()
	contentSummary: ""
	date: ""
	dateAndLocaleRemarks: ""
	date_source: ""
	donors: new Immutable.List()
	examinationLevel: ""
	folia: null # number
	identifiers: new Immutable.List()
	interestingFor: new Immutable.List()
	layoutRemarks: ""
	locations: new Immutable.List()
	marginUnits: new Immutable.List()
	marginalQuantities: new Immutable.Map
		firstPagesConsidered: null # number
		firstPagesWithMarginals: null # number
		mostFilledPageDesignation: ""
		mostFilledPagePctage: null # number
		totalBlankPages: null # number 
	marginalsSummary: ""
	name: ""
	origin: new Immutable.Map
		certain: false
		locality: new Immutable.Map()
		remarks: ""
	pageDimension_height: null # number
	pageDimension_width: null # number
	pageLayouts: new Immutable.List()
	patrons: new Immutable.List()
	pid: ""
	provenances: new Immutable.List()
	quireStructure: ""
	script: new Immutable.Map
		additionalRemarks: ""
		characteristics: ""
		handsCount: ""
		handsRange: ""
		scribeRemarks: ""
		scribes: new Immutable.List()
		types: new Immutable.List()
		typesRemarks: ""
	textUnits: new Immutable.List()
	thumbnailInfo: ""
	userRemarks: ""
	URLs: new Immutable.List()

CHANGE_EVENT = "change"

class Codex extends EventEmitter
	getState: ->
		_model
	
	listen: (callback) ->
		@addListener CHANGE_EVENT, callback

	stopListening: (callback) ->
		@removeListener CHANGE_EVENT, callback

	_set: (key, value) ->
		unless Array.isArray key
			key = [key]

		if Array.isArray(value)
			value = new Immutable.List value

		_model = _model.setIn key, value

	_delete: (key) ->
		_model = _model.deleteIn(key)

		# console.log _model, _model.get("identifiers")
	# _updateList: (attr, index, key, value) ->
	# 	_model = _model.updateIn attr, (list) =>
	# 		console.log attr, index, key, value, list
	# 		obj = list.get(index)

	# 		if Array.isArray key
	# 			obj = obj.setIn key, value
	# 		else
	# 			obj = obj.set key, value

	# 		list.set index, obj

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when 'CODEX_SET'
			codex._set payload.action.key, payload.action.value
		when "CODEX_DELETE"
			codex._delete payload.action.key
		# when "UPDATE_CODEX_LIST"
		# 	codex._updateList payload.action.attr, payload.action.index, payload.action.key, payload.action.value
		else
			return

	codex.emit CHANGE_EVENT

codex = new Codex()
codex.dispatcherIndex = dispatcher.register dispatcherCallback

window.codex = codex
module.exports = codex