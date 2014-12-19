module.exports = {
	build : {
		js : './build/js',
		umd : './build/umd',
		fileName : 'RTable.js'
	},
	jsx : './jsx/**/**.js',
	umd : './build/js/**/**.js',
	exports: 'RTable',
	port : 1234,
  	dependencies: [
	    {name: 'react', exports: 'React'},
	    {name: 'pubsub-js', exports : 'PubSub'}
  	]
};