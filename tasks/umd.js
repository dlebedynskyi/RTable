var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fs = require('fs'),
	fn;

// Umd options
var options = {
  output : config.dist.fileName,
  exports: config.dist.exportName,
  map: false,
  comments : true,
  external : {
  	react : {amd : 'react', global : 'React'},
  	'pubsub-js' : {amd : 'pubsub-js', global : 'PubSub'}
  }
};

gulp.task('umd', fn = function  () {
	//needs umd folder to exist
	if (!fs.existsSync(config.dist.dist)){
	    fs.mkdirSync(config.dist.dist);
	}
	gulp.src(config.src.cjsInput)
		.pipe(g.plumber({errorHandler: g.notify.onError("Error: <%= error.message %> ")}))
		.pipe(g.pure(options))
		.pipe(gulp.dest(config.dist.dist))
		.on('error', g.notify.onError("Error: <%= error.message %>"));
});

module.exports = fn; 