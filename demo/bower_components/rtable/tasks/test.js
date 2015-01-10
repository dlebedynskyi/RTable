var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn;

gulp.task('test', fn = function () {
    return gulp.src('.').pipe(
      g.jest(config.jest));
});

module.exports = fn;