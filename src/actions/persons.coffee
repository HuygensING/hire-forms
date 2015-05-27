dispatcher = require '../dispatcher'

API = require "../utils/api"

personsActions =
	getAllPersons: ->
		API.getAllPersons()

	getPerson: (id) ->
		API.getPerson id

	updatePerson: (data) ->
		API.updatePerson data

module.exports = personsActions