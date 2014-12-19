var gulp = require('gulp'),
   runSequence = require('run-sequence').use(gulp),
   connect = require('gulp-connect'),
   react = require('gulp-react')
   plumber = require('gulp-plumber'),
   notify =  require('gulp-notify')
   config = require('./gulp-config'),
   jest = require('gulp-jest'),
   del = require('del'),
   pure = require('gulp-pure-cjs'),
   fs = require('fs');

// Umd options
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

/** Connect **/
 gulp.task('connect', function(){
  return connect.server({
    port : config.port,
    livereload : false, 
    root: [__dirname]
  });
});

gulp.task('clean', ['react-clean', 'umd-clean']);

gulp.task('build', function(callback){
  runSequence('react', 'umd');
});

gulp.task('watch', function () {
	var reactWatch = register(config.jsx, ['react']);
	var umdWatch = register(config.umd, ['umd']);
});

gulp.task('default', ['build','watch']);


/** React **/
gulp.task('react', function(){
  return gulp.src(config.jsx)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %> ")}))
    .pipe(react())
    .pipe(gulp.dest(config.build.js))
    .on('error', notify.onError("Error: <%= error.message %>"));
});

gulp.task('react-clean', function(){
	del(config.build.js);
});

/** Test **/

gulp.task('test', function(){
	return gulp.src('./test/').pipe(jest({
        scriptPreprocessor: "./support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "test",
        testPathIgnorePatterns: [
            "node_modules",
            "test/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

/** UMD **/
gulp.task('umd-clean', function(){
	del(config.build.umd);;
});

gulp.task('umd', function  () {
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


function register(path, tasks){
	var watch  = gulp.watch(path,{}, tasks, function(event) {
		console.log(' callback');
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	
	watch.on('ready', function(watcher){ 
		console.log('ready to watch path: ' + path);
	});

	watch.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	watch.on('error', function(error){
		notify.onError("Error: <%= error.message %> ")
	});

	return watch;
}