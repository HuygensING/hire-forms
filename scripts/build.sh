#!/bin/sh

node_modules/.bin/browserify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-router \
	--outfile build/development/js/form.js \
	--transform [ babelify --plugins object-assign ] \
	--verbose