module.exports = {
	build : {
		js : './build/js',
		umd : './build/umd',
		fileName : 'RTable.js'
	},
	jsx : './jsx/**/**.jsx',
	exports: 'RTable',
  	dependencies: [
	    {name: 'react', exports: 'React'},
	    {name: 'pubsub-js', exports : 'PubSub'}
  	]
};