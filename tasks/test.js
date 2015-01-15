var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn;

gulp.task('jest',  fn = function () {
    return gulp.src('.').pipe(
      g.jest(config.jest));
});

gulp.task('test', ['react', 'jest']);


module.exports = fn;