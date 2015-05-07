React = require 'react/addons'

List = require './components/list'
Input = require './components/input'
Autocomplete = require './components/autocomplete'

# if __WEBPACK__?
# 	require './style'

App = React.createClass
	render: ->
		<div className="app">
			<header>
				<h1>HiReForms showcase</h1>
			</header>
			<nav className="menu">
				<ol>
					<li>Inputs</li>
					<li>Lists</li>
				</ol>
			</nav>
			<div className="elements">
				<h2>Inputs</h2>
				<div className="element-type inputs">
					<h3>Input</h3>
					<div className="input-container">
						<Input placeholder="This is a placeholder" />
					</div>
					<h3>Autocomplete</h3>
					<div className="input-container">
						<Autocomplete
							placeholder="Start typing for suggestions..." 
							values={["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]} />
					</div>
				</div>
				<h2>Lists</h2>
				<div className="element-type lists">
					<h3>List</h3>
					<List initialValue={["Marie", "Gijs", "Jaap"]} />
					<h3>Ordered list</h3>
					<List initialValue={["Marie", "Gijs", "Jaap"]} ordered={true} />
				</div>
			</div>
		</div>

module.exports = App
