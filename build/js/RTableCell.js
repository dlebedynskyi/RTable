/**
 * @jsx React.DOM
 */
var React =  require('react');

function warn(){
	if (console){console.warn(arguments);}
}

var RTableCell = React.createClass({displayName: 'RTableCell',
	
    render : function(){ 
    		var def = null,
    			dataObj = null;

    		if (typeof this.props.definition  === 'object') {
    			if (!this.props.columnFieldValueProp ||
    				!this.props.definition.hasOwnProperty(this.props.columnFieldValueProp)){ 
    				warn('definition property was not found on definition object', this.props.definition, this.props.columnFieldValueProp);
    			}
    			def = this.props.definition[this.props.columnFieldValueProp];
    		} else  { def = this.props.definition; }

           	if ('.' !== this.props.dataProp){
           		if (!this.props.data.hasOwnProperty(this.props.dataProp)){
           			warn('could not find data propety on object', this.props.data, this.props.dataProp);
           		}
           		dataObj = this.props.data[this.props.dataProp];
           	} else {dataObj = this.props.data;}

           	return (React.createElement("td", null, dataObj[def]));
          }
    });

module.exports = RTableCell;
