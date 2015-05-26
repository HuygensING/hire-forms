dispatcher = require '../dispatcher'

API = require "../utils/api"

personsActions =
	getAllPersons: ->
		API.getAllPersons()

module.exports = personsActions