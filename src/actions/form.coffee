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

module.exports = codexActions