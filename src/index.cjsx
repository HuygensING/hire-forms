React = require 'react/addons'
React.initializeTouchEvents true
window.React = React

App = require './app'

Router = require 'react-router'
Route = Router.Route

routes =
	<Route path="/" handler={App}></Route>

document.addEventListener 'DOMContentLoaded', ->
	Router.run routes, Router.HistoryLocation, (Handler) ->
		React.render <Handler />, document.body
