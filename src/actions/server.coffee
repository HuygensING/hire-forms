dispatcher = require '../dispatcher'

serverActions =
	receiveAllPersons: (data) ->
		dispatcher.handleServerAction
			actionType: "PERSONS_RECEIVE_ALL"
			data: data

module.exports = serverActions