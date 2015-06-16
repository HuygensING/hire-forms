#!/bin/sh

node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-router > build/development/js/libs.js