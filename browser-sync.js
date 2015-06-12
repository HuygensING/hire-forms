/* BROWSER-SYNC */

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");

browserSync.watch(["**/*.css", "*.html"], function (event, file) {
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

// /* WATCHIFY */
// var browserify = require("browserify");
// var watchify = require("watchify");
// var babelify = require("babelify");
// var objectAssign = require("object-assign");

// var args = objectAssign(watchify.args, {
// 	entries: "./src/index.jsx",
// 	extensions: [".jsx", ".js"]
// });

// var b = browserify(args);
// var w = watchify(b);

// var bblfy = babelify.configure({
// 	plugins: ["object-assign"]
// });
// w.transform(bblfy);

// w.on("update", function(d) {
// 	console.log(d);
// 	browserSync.reload(d[0]);
// });

// w.bundle();