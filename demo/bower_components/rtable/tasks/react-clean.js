var gulp = require('gulp'),
	config = require('./config'),
    del = require('del'),
    fn;


gulp.task('react-clean', function(){
	del(config.dist.cjs);
});