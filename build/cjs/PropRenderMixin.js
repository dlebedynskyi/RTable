/*

Provides comparation of old and new properties for shouldComponentUpdate method by using JSON.strinify comparation. 
This provides deep comparation for properties with arrays and objects. 

NOTE ANY METHODs will be ignored
NOTE  ORDER MATTERS {a :'1', b : '2'} will be FALSE to {b : '2', a : '1'}

Author : Dmytro Lebedynskyi

Why ?

If your React component's render function is "pure" (in other words, it renders the same result given the same props and state),
 you can use this mixin for a performance boost in some cases.

 */
var PropRenderMixin = {
 	componentWillMount: function() {
	    this.shouldUpdate = true;
	    this.oldProps = {};
  	},
	componentWillReceiveProps : function(newProps){
        var shouldUpdate = true,
            newPropsStr = null;
        if (this.props.optimization){
            newPropsStr = JSON.stringify(newProps);
            this.shouldUpdate =  this.oldProps !== newPropsStr;
        }

		this.oldProps = newPropsStr;
    },
    shouldComponentUpdate : function(newProps, newState){
        return this.shouldUpdate;
    }
};

module.exports  =  PropRenderMixin;
 

