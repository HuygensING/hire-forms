dispatcher = require '../dispatcher'

codexActions =
	update: (key, value) ->
		dispatcher.handleViewAction
			actionType: "UPDATE_CODEX"
			key: key
			value: value

module.exports = codexActions