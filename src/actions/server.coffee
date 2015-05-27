dispatcher = require '../dispatcher'

serverActions =
	receiveAllPersons: (data) ->
		dispatcher.handleServerAction
			actionType: "PERSONS_RECEIVE_ALL"
			data: data

	receivePerson: (data) ->
		dispatcher.handleServerAction
			actionType: "PERSONS_RECEIVE"
			data: data
	
	updatePerson: (data) ->
		dispatcher.handleServerAction
			actionType: "PERSONS_UPDATE"
			data: data

	receiveAllTexts: (data) ->
		dispatcher.handleServerAction
			actionType: "TEXTS_RECEIVE_ALL"
			data: data

module.exports = serverActions