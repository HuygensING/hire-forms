#!/bin/sh

node_modules/.bin/jade \
	--no-debug \
	--obj src/server-state.json \
	--out build/development \
	--watch \
	src/index.jade &

./node_modules/.bin/stylus \
	--compress \
	--out build/development/css/form.css \
	--watch \
	src/ &

node_modules/.bin/watchify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-router \
	--outfile build/development/js/form.js \
	--transform [ babelify --plugins object-assign ] \
	--verbose