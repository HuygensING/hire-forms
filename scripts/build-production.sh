#!/bin/sh

rm -rf build/production

mkdir -p build/production/js
mkdir build/production/css

cp -r WEB-INF build/production

# Copy statics
cp -r static/images build/production

# Build HTML
node_modules/.bin/jade \
	--no-debug \
	--out build/production \
	src/index.jade

chmod 755 build/production/index.html

# Build CSS
node_modules/.bin/stylus \
	--compress \
	--out build/production/css/form.css \
	src/

# Build libs
node_modules/.bin/browserify \
	--global-transform uglifyify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-router > build/production/js/libs.js

# Build src
node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-router \
	--global-transform uglifyify \
	--outfile build/production/js/form.js \
	--transform [ babelify --plugins object-assign ] \
	--verbose