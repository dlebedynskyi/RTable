var gulp = require('gulp'),
	tasks = require('require-dir')('tasks'),
	runSequence = require('run-sequence').use(gulp) 
    del = require('del'),
    fs = require('fs'),
    jest = require('jest-cli');


gulp.task('clean', ['react-clean']);

gulp.task('default', function  () {
		
})