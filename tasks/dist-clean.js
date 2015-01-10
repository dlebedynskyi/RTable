var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	del = require('del'),
	fn;

gulp.task('dist-clean', fn =  function(){
	del(config.dist.dist);
});

module.exports = fn;