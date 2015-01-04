var gulp = require('gulp'),
   runSequence = require('run-sequence').use(gulp) 
   del = require('del'),
   fs = require('fs'),
   g = require('gulp-load-plugins')({
      scope: ['dependencies', 'devDependencies', 'peerDependencies'],
      rename : {
        'gulp-pure-cjs' : 'pure',
        'gulp-uglifyjs' : 'uglify'
      }});

var config = {
  build : {
    js : './build/cjs',
    umd : './build/umd',
    fileName : 'rtable.js',
    minFileName : 'rtable.min.js'
  },
  
  jsxSource : './jsx/**/**.js',
  umdSource : './build/cjs/**/**.js',
  distSource  : './build/umd/**/**.js',
  testSource : './test/**/**.spec.js',

  dist : './dist',
  exports: 'RTable',
  sourceMap : true,
  port : 1234,
    dependencies: [
      {name: 'react', exports: 'React'},
      {name: 'pubsub-js', exports : 'PubSub'}
    ]
};

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
  return g.connect.server({
    port : config.port,
    livereload : false, 
    root: [__dirname]
  });
});

gulp.task('clean', ['react-clean', 'umd-clean', 'dist-clean']);

gulp.task('build', function(callback){
  runSequence('react', 'umd', 'dist');
});

gulp.task('watch', function () {
	var reactWatch = register(config.jsxSource, ['react']);
	var umdWatch = register(config.umdSource, ['umd', 'dist']);
});

gulp.task('default', ['build','watch']);

gulp.task('dist-clean', function(){
  del(config.dist);
});

gulp.task('dist', function(){
  return gulp.src(config.build.umd +"/"+config.build.fileName)
    .pipe(g.uglify(config.build.minFileName, 
    {
      outSourceMap : config.sourceMap
    }))
    .pipe(gulp.dest(config.dist));
});

/** React **/
gulp.task('react', function(){
  return gulp.src(config.jsxSource)
    .pipe(g.plumber({errorHandler: g.notify.onError("Error: <%= error.message %> ")}))
    .pipe(g.react())
    .pipe(gulp.dest(config.build.js))
    .on('error', g.notify.onError("Error: <%= error.message %>"));
});

gulp.task('react-clean', function(){
	del(config.build.js);
});

/** Test **/

gulp.task('test', function(){
	return gulp.src('./test/').pipe(g.jest({
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

gulp.task('watch-test',function(){
  var watch = register([config.testSource, config.jsxSource],['test']);
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
		.pipe(g.plumber({errorHandler: g.notify.onError("Error: <%= error.message %> ")}))
		.pipe(g.pure(options))
		.pipe(gulp.dest(config.build.umd))
    .pipe(gulp.dest(config.dist))
		.on('error', g.notify.onError("Error: <%= error.message %>"));;
});

//linter

gulp.task('lint', ['react'], function(){
  console.log ('LINT REPORT');
  return gulp.src(config.umdSource)
    .pipe(g.jshint())
    .pipe(g.jshint.reporter(stylish));
});

//functions

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
		g.notify.onError("Error: <%= error.message %> ")
	});

	return watch;
}

