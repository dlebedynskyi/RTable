var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fn = {};

gulp.task('dist-js',['build'], fn.js = function(){
  var path = config.dist.dist + '/'+config.dist.fileName;
  return gulp.src(path)
    .pipe(g.uglify(config.dist.minFileName, 
    {
      outSourceMap : true,
      sourceRoot : config.dist.fileName
    }))
    .pipe(gulp.dest(config.dist.dist));
});

gulp.task('dist-css', fn.css = function(){
	gulp.src(config.src.css)
        .pipe(g.cssmin())
        .pipe(g.rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dist.css));
});

module.exports = fn;