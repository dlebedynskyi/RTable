module.exports = {
	src : {
		jsx : './jsx/**/**.js',
		cjs : './cjs/**/**.js',
		cjsInput : './cjs/rtable.js',
		css : ['./css/**/*.css', '!./css/**/*.min.css']
	},
	dist : {
		cjs : './cjs',
		dist : './dist',
		fileName : 'rtable.js',
		exportName : 'RTable',
		minFileName : 'rtable.min.js',
		css : './css'
	},
	connect : {
		port : 1234,
		root : '.'
	},
	jest : {
		//scriptPreprocessor : './tests/support/preprocessor.js',
		unmockedModulePathPatterns: [
            "react"
        ],
        testDirectoryName: "tests",
        testPathIgnorePatterns: [
            "node_modules",
            "tests/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
	}
};