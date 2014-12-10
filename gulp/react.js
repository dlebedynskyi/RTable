var gulp = require('gulp'),
	del = require('del'),
	react = require('gulp-react'),
	plumber = require('gulp-plumber'),
  notify =  require('gulp-notify'),
  config = require('./util/config');

gulp.task('build-react-compile', function(){
  return gulp.src(config.jsx)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %> ")}))
    .pipe(react())
    .pipe(gulp.dest(config.build.js))
    .on('error', notify.onError("Error: <%= error.message %>"));
});

gulp.task('build-react-clean', function(){
	del(config.build.js);
});

gulp.task('react', ['build-react-compile']);