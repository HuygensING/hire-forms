React = require 'react/addons'
React.initializeTouchEvents true
# window.React = React

App = require './app'
Showcase = require "./showcase"
MarginalScholarshipForm = require "./form"

Router = require 'react-router'
Route = Router.Route

routes =
	<Route name="app" path="/" handler={App}>
		<Route name="showcase" handler={Showcase} />
		<Route name="form" handler={MarginalScholarshipForm} />
	</Route>

document.addEventListener 'DOMContentLoaded', ->
	Router.run routes, Router.HistoryLocation, (Handler) ->
		React.render <Handler />, document.body