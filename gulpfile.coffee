gulp = require 'gulp'
gutil = require 'gulp-util'

extend = require 'extend'

browserSync = require 'browser-sync'
modRewrite = require 'connect-modrewrite'

browserify = require 'browserify'
watchify = require 'watchify'
source = require 'vinyl-source-stream'
babelify = require "babelify"

stylus = require 'gulp-stylus'
nib = require 'nib'

jade = require 'gulp-jade'


gulp.task 'server', ['stylus', 'jade', 'watch', 'watchify'], ->
	browserSync
		server:
			baseDir: './build/development'
			middleware: [
				# proxy(proxyOptions),
				modRewrite([
					'^[^\\.]*$ /index.html [L]'
				])
			]
		notify: false

gulp.task 'watchify', ->
	bundle = ->
		gutil.log('Watchify: bundling')
		bundler.bundle()
			.on('error', ((err) -> gutil.log("Bundling error ::: "+err)))
			.pipe(source("index.js"))
			.pipe(gulp.dest("./build/development/js"))
			.pipe(browserSync.reload(stream: true, once: true))

	args = extend watchify.args,
		entries: './src/index.jsx'
		extensions: ['.jsx', '.js']

	bundler = watchify browserify args
	bblfy = babelify.configure(plugins: ["object-assign"])
	bundler.transform(bblfy)
	bundler.on 'update', bundle

	bundle()

gulp.task 'stylus', ->
	gulp.src('./src/index.styl')
		.pipe(stylus(
			use: [nib()]
		))
		# .pipe(rename("index.css"))
		.pipe(gulp.dest('./build/development/css'))
		.pipe(browserSync.reload({stream: true}))

gulp.task 'jade', ->
	gulp.src('./src/index.jade')
		.pipe(jade())
		.pipe(gulp.dest("./build/development"))
		.pipe(browserSync.reload({stream: true}))

gulp.task 'watch', ->
	# gulp.watch cssFiles, ['concatCss']
	gulp.watch ['./src/**/*.styl'], ['stylus']
	gulp.watch ['./src/index.jade'], ['jade']

gulp.task 'default', ['server']