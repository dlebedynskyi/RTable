var gulp = require('gulp'),
   runSequence = require('run-sequence').use(gulp),
   connect = require('gulp-connect'),
   watch = require('gulp-watch');
	
gulp.task('connect', function(){
  return connect.server({
    port : 1234,
    livereload : true, 
    root: [__dirname+"/.."]
  });
});

gulp.task('connect-reload', function(){
	console.log('reloading browser');
	return gulp.src('./build/umd/**.js').pipe(connect.reload());
});

gulp.task('clean', ['build-react-clean', 'build-umd-clean']);

gulp.task('build',  function(callback){
  return runSequence('clean', 'react', 'umd');
});

gulp.task('watch', function () {
	gulp.watch('./jsx/**/**.jsx', ['build-react-compile']);
	
	gulp.watch('./build/**/**.js', ['build-umd']);

	watch('./build/umd/**/**').pipe(connect.reload());
});

gulp.task('default', ['build', 'watch']);