/**
 * @jsx React.DOM
Provides comparation of old and new properties for shouldComponentUpdate method by using json comparation. 
This provides deep comparation for properties with arrays and objects. 
NOTE This does not compare methods
NOTE {a :'1', b : '2'} will be FALSE to {b : '2', a : '1'}
 */
 var utils = require('./utils');

 var PropRenderMixin = {
 	componentWillMount: function() {
	    this.shouldUpdate = true;
	    this.oldProps = {};
  	},
	componentWillReceiveProps : function(newProps){
        var shouldUpdate = true,
            newPropsStr = null;
        if (this.props.optimization){
            newPropsStr = utils.stringify(newProps);
            this.shouldUpdate =  this.oldProps !== newPropsStr;
        }

		this.oldProps = newPropsStr;
    },
    shouldComponentUpdate : function(newProps, newState){
        return this.shouldUpdate;
    }
};
module.exports  =  PropRenderMixin;
 

