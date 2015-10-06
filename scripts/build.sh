#!/bin/sh

# Create server state
node_modules/.bin/babel-node scripts/server-state.js

node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-router > build/development/js/libs.js

node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-router \
	--outfile build/development/js/form.js \
	--transform [ babelify --plugins object-assign ] \
	--verbose