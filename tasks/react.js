var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn;

gulp.task('react', function(){
  return gulp.src(config.src.jsx)
    .pipe(g.plumber({errorHandler: g.notify.onError("Error: <%= error.message %> ")}))
    .pipe(g.react())
    .pipe(gulp.dest(config.dist.cjs))
    .on('error', g.notify.onError("Error: <%= error.message %>"));
});


module.exports = fn;