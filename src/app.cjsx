React = require 'react/addons'

List = require './components/list'

if __WEBPACK__?
	require './style'

App = React.createClass
	render: ->
		<div className="app">
			<header>
				<h1>HireForms showcase</h1>
			</header>
			<nav className="menu">
				<ol>
					<li>List</li>
				</ol>
			</nav>
			<div className="elements">
				<div className="list">
					<h3>List</h3>
					<List initialValue={["Marie", "Gijs", "Jaap"]} />
				</div>
			</div>
		</div>

module.exports = App
