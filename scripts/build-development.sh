#!/bin/sh

# Copy statics
cp -r static/images build/development

# Build HTML
node_modules/.bin/jade \
	--no-debug \
	--out build/development \
	src/index.jade

# Build CSS
node_modules/.bin/stylus \
	--compress \
	--out build/development/css/form.css \
	src/

# Build libs
node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-router > build/development/js/libs.js

# Build src
node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-router \
	--outfile build/development/js/form.js \
	--transform [ babelify --plugins object-assign ] \
	--verbose