var gulp = require('gulp'),
	runSequence = require('run-sequence').use(gulp),
	fn;

gulp.task('build', fn = function(cb){
	runSequence('react', 'umd', cb);
});

module.exports = fn;