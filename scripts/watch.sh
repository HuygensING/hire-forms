#!/bin/sh

node_modules/.bin/jade \
	--no-debug \
	-O scripts/server-state.json \
	--out build/development \
	--watch \
	src/index.jade &

./node_modules/.bin/stylus \
	--out build/development/css/index.css \
	--use /home/developer/marginal-scholarship-frontend/node_modules/nib/lib/nib.js \
	--watch \
	src/ &

node_modules/.bin/watchify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-dom \
	--external react-router \
	--outfile build/development/js/index.js \
	--transform [ babelify ] \
	--verbose
