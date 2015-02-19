# assert = require "assert"
# MockBrowser = require('mock-browser').mocks.MockBrowser
# GLOBAL.document = MockBrowser.createDocument()
# GLOBAL.window = MockBrowser.createWindow()
# GLOBAL.navigator = userAgent: []
jest.dontMock "../src/components/list/index.cjsx"
jest.dontMock "../src/components/list/list-item/index.cjsx"

React = require "react/addons"
TestUtils = React.addons.TestUtils

List = require "../src/components/list/index.cjsx"

describe "List", ->

	it "Should have class list", ->
		list = TestUtils.renderIntoDocument <List initialValue={["Gijs", "Marie", "Jaap"]} />
		console.log(list)
		expect(list.getDOMNode().className).toEqual "list"
	
#	it "Should have three list items", ->
#		listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "list-item")
#		expect(listItems.length).toEqual 3
#
#	it "Should have four inputs", ->
#		inputs = TestUtils.scryRenderedDOMComponentsWithTag(list, "input")
#		expect(inputs.length).toEqual 4
