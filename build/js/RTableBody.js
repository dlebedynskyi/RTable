/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell');

var RTableBody = React.createClass({
	displayName : 'RTableBody',
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
        data : React.PropTypes.arrayOf(React.PropTypes.object),
         //add column for selection row
        selection : React.PropTypes.bool
    },
    render : function(){
            var rows = [],
            	data = this.props.data && this.props.data.length ? this.props.data : [];
            
            for (var i = 0; i < data.length; i++) {
            	var cells = [];
                if (this.props.selection)
                {
                    cells.push(React.createElement("td", {key: 'row_'+i +'_selection', className: "rtable-selection-row"}, React.createElement("input", {type: "checkbox"})));
                }

            	for (var j = 0; j < this.props.definitions.length; j++) {
        			cells.push(React.createElement(RTableCell, {key: 'row_'+i+'_cell_'+j, data: data[i], definition: this.props.definitions[j], dataProp: this.props.dataProp, columnFieldValueProp: this.props.columnFieldValueProp}))
            		};

            	rows.push(React.createElement("tr", {key: 'row_'+i}, cells));
            };

            return (React.createElement("tbody", null, rows));
          }
    });

module.exports = RTableBody;
