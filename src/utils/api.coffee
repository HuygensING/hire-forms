xhr = require 'xhr'

dispatcher = require '../dispatcher'

serverActions = require '../actions/server'

module.exports =
	getAllPersons: ->
		xhr
			url: "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend/lists/person"
			header:
				"Content-Type": "application/json"
		,
			(err, resp, body) ->
				serverActions.receiveAllPersons JSON.parse(body)