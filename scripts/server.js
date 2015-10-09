#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./build/development";
var watchFiles = [
	baseDir + "/js/*.js",
	baseDir + "/css/*.css",
	baseDir + "/index.html"
];

var onFilesChanged = function (event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
};

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

var proxyOptions = url.parse("http://demo17.huygens.knaw.nl/test-marginal-scholarship-backend");
proxyOptions.route = "/api";

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [
			proxy(proxyOptions),
			modRewrite([
				"^[^\\.]*$ /index.html [L]"
			])
		]
	}
});