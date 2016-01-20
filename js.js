var babel = require("gulp-babel");
var concat = require("gulp-concat");
var gulp = require("gulp");
var gulpIf = require("gulp-if");
var less = require("gulp-less");
var path = require("path");
var plumber = require("gulp-plumber");
var size = require("gulp-size");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

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
            .pipe(gulpIf(function (file) {
                return !/(bower_components|node_modules|vendor)/.test(file.path);
            }, babel({presets: ["es2015"]})))
            .pipe(gulpIf(!!spec.production, uglify()))
            .pipe(concat(destFile))
            .pipe(sourcemaps.write("."))
            .pipe(size({title: spec.name}))
            .pipe(gulp.dest(destDir));
    };
};
