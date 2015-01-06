/**
 * @jsx React.DOM
 */
var React =  require('react'),
  utils = require('./utils'),
    PropRenderMixin = require('./PropRenderMixin');

var RTableCell = React.createClass({
  mixins: [PropRenderMixin],
	displayName : 'RTableCell',
  getDefaultProps : function(){
    return {  
          data : {},
          definition : {},
          columnFieldValueProp : 'field',
          dataProp : '.',
          optimization : true
        };
  },
	propTypes : {
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Definition for column
        definition : React.PropTypes.oneOfType([
        	React.PropTypes.string, 
        	React.PropTypes.object]),
        //Data object. will use dataProp to look for display values. Value will be taken based on columnFieldValueProp value of definition object
        data : React.PropTypes.object,
        //optimisation flag. Default is true. Uses memory
        optimization : React.PropTypes.bool
    },
    render : function(){ 
    		var def = null,
    			dataObj = null;

    		if (typeof this.props.definition  === 'object') {
    			if (!this.props.columnFieldValueProp ||
    				!this.props.definition.hasOwnProperty(this.props.columnFieldValueProp)){ 
    				utils.warn('definition property was not found on definition object', this.props.definition, this.props.columnFieldValueProp);
    			}
    			def = this.props.definition[this.props.columnFieldValueProp];
    		} else  { def = this.props.definition; }

           	if ('.' !== this.props.dataProp){
           		if (!this.props.data.hasOwnProperty(this.props.dataProp)){
           			utils.warn('could not find data propety on object', this.props.data, this.props.dataProp);
           		}
           		dataObj = this.props.data[this.props.dataProp];
           	} else {dataObj = this.props.data;}

           	return (React.createElement("td", null, dataObj[def]));
          }
    });

module.exports = RTableCell;
