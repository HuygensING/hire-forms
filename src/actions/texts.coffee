dispatcher = require '../dispatcher'

API = require "../utils/api"

textsActions =
	getAllTexts: ->
		API.getAllTexts()

module.exports = textsActions