var plumber = require("gulp-plumber");

module.exports.plumb = function plumb() {
    return plumber({
        handleError: function (err) {
            console.log(err);
            this.emit("end");
        }
    });
};