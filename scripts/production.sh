#!/bin/sh

rm -rf build/production

mkdir -p build/production/js
mkdir build/production/css

# Copy rewrite rules
cp -r WEB-INF build/production

# Copy statics
cp -r static/images build/production

rm -f scripts/server-state.json
node_modules/.bin/babel-node scripts/server-state.js

# Build HTML
node_modules/.bin/jade \
	--no-debug \
	-O scripts/server-state.json \
	--out build/production \
	src/index.jade

chmod 755 build/production/index.html

# Build CSS
node_modules/.bin/stylus \
	--compress \
	--out build/production/css/index.css \
	src/

# Build libs
./scripts/libs.sh production

# Build src
node_modules/.bin/browserify src/index.jsx \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--external react-dom \
	--external react-router \
	--global-transform uglifyify \
	--outfile build/production/js/index.js \
	--transform [ babelify ] \
	--verbose
