Immutable = require 'immutable'
EventEmitter = require('events').EventEmitter

dispatcher = require '../dispatcher'

_model = new Immutable.Map
	URLs: new Immutable.List()
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
		certain: ""
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




m = _model.setIn(["locatie", "sporthallen", 0, "naam"], "test")
console.log m.getIn(["locatie", "sporthallen", 0, "naam"])
	
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

	_updateList: (attr, index, key, value) ->
		_model = _model.updateIn attr, (list) =>
			console.log attr, index, key, value, list
			obj = list.get(index)

			if Array.isArray key
				obj = obj.setIn key, value
			else
				obj = obj.set key, value

			list.set index, obj

dispatcherCallback = (payload) ->
	switch payload.action.actionType
		when 'UPDATE_CODEX'
			codex._update payload.action.key, payload.action.value
		when "UPDATE_CODEX_LIST"
			codex._updateList payload.action.attr, payload.action.index, payload.action.key, payload.action.value
		else
			return

	codex.emit CHANGE_EVENT

codex = new Codex()
codex.dispatcherIndex = dispatcher.register dispatcherCallback

window.codex = codex
module.exports = codex