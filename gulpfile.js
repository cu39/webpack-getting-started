// ref: https://webpack.github.io/docs/usage-with-gulp.html
// ref: https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.assign({}, webpackConfig);
  myConfig.mode = "production";

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.assign({}, webpackConfig);
myDevConfig.mode = "development";
myDevConfig.devtool = "sourcemap";

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  var host = "localhost";
  var port = 8000;
  var baseUrl = "http://" + host + ":" + port + "/webpack-dev-server/";
  var compiler = webpack(myDevConfig);

  // Start a webpack-dev-server
  var server = new WebpackDevServer(compiler, {
    publicPath: myDevConfig.output.publicPath,
    stats: {
      colors: true
    }
  });

  server.listen(port, host, function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", baseUrl);
  });
});

// The development server (the recommended option for development)
gulp.task("default", gulp.parallel("webpack-dev-server"));

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", gulp.parallel("webpack:build-dev"), function() {
  gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", gulp.parallel("webpack:build"));
