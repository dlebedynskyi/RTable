var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn;

gulp.task('lint', fn = function(){
  return gulp.src(config.src.cjs)
    .pipe(g.jshint())
    .pipe(g.jshint.reporter(g.stylish));
});


module.exports = fn;