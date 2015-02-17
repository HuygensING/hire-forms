React = require 'react/addons'

List = require './components/list'

require './app'

App = React.createClass
	render: ->
		<div className="app">
			<List initialValue={["Marie", "Gijs", "Jaap"]} />
		</div>

module.exports = App
