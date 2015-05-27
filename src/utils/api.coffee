xhr = require 'xhr'

dispatcher = require '../dispatcher'

serverActions = require '../actions/server'

baseUrl = "http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend"

module.exports =
	getAllPersons: ->
		xhr
			url: baseUrl + "/lists/person"
			header:
				"Content-Type": "application/json"
		,
			(err, resp, body) ->
				serverActions.receiveAllPersons JSON.parse(body)

	getPerson: (id) ->
		xhr
			url: baseUrl + id
			header:
				"Content-Type": "application/json"
		,
			(err, resp, body) ->
				serverActions.receivePerson JSON.parse(body)
	

	updatePerson: (data) ->
		data = data.toJS()

		id = data.key
		delete data.key
		delete data.value

		xhr
			method: "PUT"
			body: JSON.stringify(data)
			url: baseUrl + id
			headers:
				"Content-Type": "application/json"
				"Authorization": "Federated 5fc90b8a-71dd-457e-9a7e-6305773b7bbc"
		,
			(err, resp, body) ->
				serverActions.updatePerson data
	
	getAllTexts: ->
		xhr
			url: baseUrl + "/lists/text"
			header:
				"Content-Type": "application/json"
		,
			(err, resp, body) ->
				serverActions.receiveAllTexts JSON.parse(body)