var gulp = require('gulp'), 
	g = require ('./g'), 
	config = require('./config'),
	fs = require('fs'),
	fn;

gulp.task('umd', function  () {
	//needs umd folder to exist
	if (!fs.existsSync(config.dist.umd)){
	    fs.mkdirSync(config.dist.umd);
	}

	return gulp.src(config.build.js +'/' +config.build.fileName)
		.pipe(g.plumber({errorHandler: g.notify.onError("Error: <%= error.message %> ")}))
		.pipe(g.pure(options))
		.pipe(gulp.dest(config.build.umd))
    .pipe(gulp.dest(config.dist))
		.on('error', g.notify.onError("Error: <%= error.message %>"));;
});