#!/bin/sh

node_modules/.bin/browserify \
	--global-transform uglifyify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-dom \
	--require react-router > "build/$1/js/libs.js"
