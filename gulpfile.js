var gulp = require('gulp'),
	tasks = require('require-dir')('tasks');

/** Gulp Tasks
connect - run server on localhost: 1234.

build - builds react and umd. Result is rtable.js.
clean  - cleans all.
dist - builds all and mins.

watch - runs watcher changes in  jsx and cjs. 
watch-dev - runs watchers for changes in cjs and test - runs test and linter.

lint - linter on cjs files.
test - runs jest tests.


tasks/config.js - all configurations for tasks.
**/

gulp.task('clean', ['react-clean', 'dist-clean']);

gulp.task('dist', ['dist-js', 'dist-css']);

gulp.task('default',  ['build', 'watch'], function  () {});