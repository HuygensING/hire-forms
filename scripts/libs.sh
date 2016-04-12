#!/bin/sh
NODE_ENV=production
node_modules/.bin/browserify \
	--global-transform uglifyify \
	--outfile "build/$1/js/libs.js" \
	--require classnames \
	--require immutable \
	--require react \
	--require react-dom \
	--require react-router \
	--transform [ envify --NODE_ENV production ]
