var gulp = require('gulp'), 
	g = require ('./g'),
	config = require('./config'),
	fn;

/** Connect **/
 gulp.task('connect',fn = function(){
  return g.connect.server({
    port : config.connect.port,
    livereload : false, 
    root: config.connect.root
  });
});

module.exports = fn;