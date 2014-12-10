var gulp = require('gulp'),
	jest = require('gulp-jest');


gulp.task('test', function(){
	return gulp.src('./test/').pipe(jest({
        scriptPreprocessor: "./support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "test",
        testPathIgnorePatterns: [
            "node_modules",
            "test/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});