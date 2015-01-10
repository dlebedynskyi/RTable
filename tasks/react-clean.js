var gulp = require('gulp'),
	config = require('./config'),
    del = require('del');


gulp.task('react-clean', function(){
	del(config.dist.cjs);
});