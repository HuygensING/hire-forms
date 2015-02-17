extend = require 'extend'

snippets =
	inlineBlock:
		display: "inline-block"
		boxSizing: "border-box"
		verticalAlign: "top"

set = (snippetNames, styleProps) ->
	style = {}

	args = snippetNames.map((name) -> snippets[name])
	args.unshift true, {}
	args.push styleProps

	extend.apply null, args

main = ->
	listitem:
		padding: "1px 4px"
		cursor: "pointer"
	input: set ['inlineBlock'],
		display: "none"
		width: "90%"
		fontFamily: "inherit"
		fontSize: "1em"
	remove: set ['inlineBlock'],
		display: "none"
		width: "10%"
	highlight:
		backgroundColor: "yellow"

edit = ->
	value:
		display: "none"
	input:
		display: "inline-block"
	remove:
		display: "inline-block"

module.exports = (editMode) ->
	s = main()
	
	if editMode
		s = extend true, {}, s, edit()

	s

# .list-item
# 	padding 1px 4px
# 	cursor pointer

# 	&.duplicate
# 		span.duplicate-warning
# 			opacity 1
# 	&.edit
# 		padding-left 0px	

# 		span.value
# 			display none

# 		input
# 			display inline-block

# 		span.remove
# 			display inline-block

# 	&:hover
# 		background-color lightblue
	
# 	input, span.remove
# 		display none
# 		box-sizing border-box

# 	input
# 		font-family inherit
# 		font-size 1em
# 		width 90%
# 		padding-left 3px

# 	span.remove
# 		width 10%
# 		color darkred
# 		transition opacity 350ms
# 		text-align right

# 	span.highlight
# 		background yellow
