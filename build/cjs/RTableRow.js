/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell'),
    RTableSelect = require('./RTableSelect'),
    PropRenderMixin = require('./PropRenderMixin');

var RTableRow = React.createClass({
    mixins: [PropRenderMixin],
	displayName : 'RTableRow',
    getDefaultProps : function  () {
        return {  
            dataProp : '.',
            columnFieldValueProp : 'field',
            selection : true,
            data : {},
            definitions : [],
            optimization : true
        };
    },
	propTypes : {
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Definitions for columns
        definitions : React.PropTypes.oneOfType([
        	React.PropTypes.arrayOf(React.PropTypes.string), 
        	React.PropTypes.arrayOf(React.PropTypes.object)]),
        //Data objects
        data : React.PropTypes.object,
         //add column for selection row
        selection : React.PropTypes.bool,
         //optimization flag. Default is true. Uses memory
        optimization : React.PropTypes.bool,
        //row count 
        rowCount : React.PropTypes.number
    },
    render : function(){
        	var cells = [];
            if (this.props.selection){
                cells.push(React.createElement(RTableSelect, {key: 'row_'+this.props.rowCount +'_selection', data: this.props.data}));
            }

        	for (var j = 0; j < this.props.definitions.length; j++) {
    			cells.push(React.createElement(RTableCell, {key: 'row_'+this.props.rowCount+'_cell_'+j, 
                                       data: this.props.data, 
                                       definition: this.props.definitions[j], 
                                       dataProp: this.props.dataProp, 
                                       columnFieldValueProp: this.props.columnFieldValueProp, 
                                       optimisation: this.props.optimisation}));
    		}

        return (React.createElement("tr", null, cells));
      }
});

module.exports = RTableRow;