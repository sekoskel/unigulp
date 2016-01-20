module.exports = function cascade(gulp) {
    var groups = {};
    Object.keys(gulp.tasks).forEach(function (name) {
        var bits = name.split(":");
        for (var i = bits.length - 1; i > 0; i--) {
            var group = bits.slice(0, i).join(":");
            (groups[group] = (groups[group] || {}))[name] = true;
        }
    });
    Object.keys(groups).forEach(function (name) {
        if (!gulp.tasks[name]) {
            gulp.task(name, Object.keys(groups[name]));
        }
    });
};
