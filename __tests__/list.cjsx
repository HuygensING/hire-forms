componentPath = "../src/components/list/index.cjsx"

jest.dontMock componentPath
jest.dontMock "../src/components/list/list-item/index.cjsx"
jest.dontMock "immutable"

React = require "react/addons"
TestUtils = React.addons.TestUtils

List = require componentPath  

describe "List", ->
	list = null

	beforeEach ->
		list = TestUtils.renderIntoDocument <List initialValue={["Gijs", "Marie", "Jaap"]} />

	it "Should have class list", ->
		expect(list.getDOMNode().className).toEqual "list"
	
	it "Should have three list items", ->
		listItems = TestUtils.scryRenderedDOMComponentsWithClass(list, "list-item")
		expect(listItems.length).toEqual 3

	it "Should have four inputs", ->
		inputs = TestUtils.scryRenderedDOMComponentsWithTag(list, "input")
		expect(inputs.length).toEqual 4

	it "Should set state.inputValue when input.list-input changes", ->
		input = TestUtils.findRenderedDOMComponentWithClass(list, "list-input")
		TestUtils.Simulate.change(input.getDOMNode(), target: value: "Hello world")
		expect(list.state.inputValue).toEqual("Hello world")

	it "Should add a list item when enter is pressed on the input.list-input", -
		list.state.inputValue = "Ed"
		input = TestUtils.findRenderedDOMComponentWithClass(list, "list-input")
		TestUtils.Simulate.keyDown(input.getDOMNode(), keyCode: 13)
		expect(list.state.inputValue).toEqual ""
		expect(list.state.listItems.indexOf("Ed")).toEqual 3


