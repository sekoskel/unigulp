var autoprefixer = require("autoprefixer");
var concat = require("gulp-concat");
var cssnano = require("cssnano");
var gulp = require("gulp");
var gulpIf = require("gulp-if");
var less = require("gulp-less");
var path = require("path");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var size = require("gulp-size");
var sourcemaps = require("gulp-sourcemaps");

module.exports = function getCssTask(spec) {
    var destDir = path.dirname(spec.dest);
    var destFile = path.basename(spec.dest);
    return function () {
        return gulp.src(spec.src || [])
            .pipe(plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit("end");
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(gulpIf(/\.less$/, less({
                strictImports: true,
                strictUnits: true,
                strictMath: true
            })))
            .pipe(concat(destFile))
            .pipe(postcss([
                autoprefixer({browsers: ["last 2 versions"]}),
                cssnano
            ]))
            .pipe(sourcemaps.write("."))
            .pipe(size({title: spec.name}))
            .pipe(gulp.dest(destDir));
    }
};
