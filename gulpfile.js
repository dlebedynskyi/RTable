var gulp = require('gulp'),
    connect  = require('gulp-connect');

/** Connect **/
 gulp.task('connect', function(){
  return connect.server({
    port : 7777,
    livereload : true, 
    root: 'demo'
  });
});


gulp.task('default', ['connect']);