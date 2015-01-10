var gulp = require('gulp'),
	r = require('gulp-load-plugins')({
      scope: ['dependencies', 'devDependencies', 'peerDependencies'],
      rename : {
        'gulp-pure-cjs' : 'pure',
        'gulp-uglifyjs' : 'uglify'
      }});

 module.exports = r;