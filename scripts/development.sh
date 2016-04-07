#!/bin/sh

rm -rf build/development

mkdir -p build/development/js
mkdir build/development/css

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
	--out build/development/css/index.css \
	src/

# Build libs
./scripts/libs.sh development

# Build src
node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-dom \
	--external react-router \
	--outfile build/development/js/index.js \
	--transform [ babelify  --presets [ es2015 react stage-2 ] ] \
	--verbose
