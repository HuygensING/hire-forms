assert = require "assert"
MockBrowser = require('mock-browser').mocks.MockBrowser
GLOBAL.document = MockBrowser.createDocument()
GLOBAL.window = MockBrowser.createWindow()
GLOBAL.navigator = userAgent: []

GLOBAL.React = require "react/addons"
TestUtils = React.addons.TestUtils

{List, ListItem} = require './bundle.js'

describe "List", ->
	list = null

	beforeEach ->
		list = TestUtils.renderIntoDocument <List initialValue={["Gijs", "Marie", "Jaap"]} />

	it "Should have class list", ->
		assert.equal list.getDOMNode().className, "list"
	
	it "Should have three list items", ->
		listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "list-item")
		assert.equal listItems.length, 3

	it "Should have four inputs", ->
		inputs = TestUtils.scryRenderedDOMComponentsWithTag(list, "input")
		assert.equal inputs.length, 4
