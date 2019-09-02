"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({
        plugins: [
            {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("htmlminify", function() {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"))
});

gulp.task("jsclean", function() {
  return del("source/**/*.min.js");
});

gulp.task("jsminify", function () {
  return pipeline(
        gulp.src("source/js/**/*.js"),
        uglify(),
        rename({extname: ".min.js"}),
        gulp.dest("source/js")
  );
});

gulp.task("jscompress", gulp.series("jsclean", "jsminify"));

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**/*.min.js",
    "source/css/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/*.svg").on("change", server.reload);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "jscompress", "copy", "css", "htmlminify"));
gulp.task("start", gulp.series("build", "server"));
