var gulp = require('gulp'),
	del = require('del'),
	pure = require('gulp-pure-cjs'),
	config = require('./util/config'),
	fs = require('fs'),
	plumber = require('gulp-plumber'),
  	notify =  require('gulp-notify');

var options = {
  input:  config.build.js +'/' +config.build.fileName,
  output: config.build.fileName,
  exports: config.exports,
  map: false,
  comments : true,
  external : {
  	react : {amd : 'react', global : 'React'},
  	'pubsub-js' : {amd : 'pubsub-js', global : 'PubSub'}
  }
};


gulp.task('build-umd-clean', function(){
	del(config.build.umd);;
});

gulp.task('build-umd', function  () {
	//needs umd folder to exist
	if (!fs.existsSync(config.build.umd)){
	    fs.mkdirSync(config.build.umd);
	}

	return gulp.src(config.build.js +'/' +config.build.fileName)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %> ")}))
		.pipe(pure(options))
		.pipe(gulp.dest(config.build.umd))
		.on('error', notify.onError("Error: <%= error.message %>"));;
});

gulp.task('umd', ['build-umd']);