dispatcher = require '../dispatcher'

codexActions =
	set: (key, value) ->
		dispatcher.handleViewAction
			actionType: "CODEX_SET"
			key: key
			value: value

	delete: (key) ->
		dispatcher.handleViewAction
			actionType: "CODEX_DELETE"
			key: key


	# updateMarginUnit: (key, value) ->
	# 	dispatcher.handleViewAction
	# 		actionType: "UPDATE_MARGIN_UNIT"
	# 		key: key
	# 		value: value

module.exports = codexActions