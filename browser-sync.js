var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");

browserSync.watch(["./build/development/css/*.css", "./build/development/index.html"], function (event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
});

browserSync.init({
	server: {
		baseDir: "./build/development",
		middleware: modRewrite([
			"^[^\\.]*$ /index.html [L]"
		])
	}
});

// watchify -t [ babelify --plugins object-assign] src/index.jsx --extension=.jsx -o build/development/js/form.js -v

/*var fs = require("fs");
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var objectAssign = require("object-assign");

var args = objectAssign(watchify.args, {
	entries: "./src/index.jsx",
	extensions: [".jsx", ".js"]
});
var bundler = browserify(args);
var watcher = watchify(bundler);

var bblfy = babelify.configure({plugins: ["object-assign"]});
watcher.transform(bblfy);
watcher.on("update", function() {
	console.log("UPDATING");
	watcher.bundle().pipe(fs.createWriteStream("./build/development/js/form.js"));
});

watcher.bundle().pipe(fs.createWriteStream("./build/development/js/form.js"));*/



// gulp.task 'watchify', ->
// 	bundle = ->
// 		gutil.log('Watchify: bundling')
// 		bundler.bundle()
// 			.on('error', ((err) -> gutil.log("Bundling error ::: "+err)))
// 			.pipe(source("form.js"))
// 			.pipe(gulp.dest("./build/development/js"))
// 			.pipe(browserSync.reload(stream: true, once: true))

// 	args = extend watchify.args,
// 		entries: './src/index.jsx'
// 		extensions: ['.jsx', '.js']

// 	bundler = watchify browserify args
// 	bblfy = babelify.configure(plugins: ["object-assign"])
// 	bundler.transform(bblfy)
// 	bundler.on 'update', bundle

// 	bundle()
