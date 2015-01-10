var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn = {};

gulp.task('watch', fn.watch = function(){
  register(config.src.jsx, ['react']);
  register(config.src.cjs, ['umd']);
});

gulp.task('watch-dev', fn.watchTest = function(){
	register(config.src.cjs, ['test',['lint']]);
});


function register(path, tasks){
	var watch  = gulp.watch(path,{}, tasks, function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	
	watch.on('ready', function(watcher){ 
		console.log('ready to watch path: ' + path);
	});

	watch.on('change', function(event) {
	 // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});

	watch.on('error', function(error){
    console.log("Error: <%= error.message %> ");
		g.notify.onError("Error: <%= error.message %> ");
	});

	return watch;
}


module.exports = fn;