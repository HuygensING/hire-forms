dispatcher = require '../dispatcher'

codexActions =
	updateCodex: (key, value) ->
		dispatcher.handleViewAction
			actionType: "UPDATE_CODEX"
			key: key
			value: value

	updateList: (attr, index, key, value) ->
		dispatcher.handleViewAction
			actionType: "UPDATE_CODEX_LIST"
			attr: attr
			index: index
			key: key
			value: value


	# updateMarginUnit: (key, value) ->
	# 	dispatcher.handleViewAction
	# 		actionType: "UPDATE_MARGIN_UNIT"
	# 		key: key
	# 		value: value

module.exports = codexActions