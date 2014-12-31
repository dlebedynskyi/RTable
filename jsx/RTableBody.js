/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell')
    RTableSelect = require('./RTableSelect'),
    RTableRow = require('./RTableRow'),
    utils = require('./utils');

var RTableBody = React.createClass({
	displayName : 'RTableBody',
    getDefaultProps : function  () {
        return {  
            dataProp : '.',
            columnFieldValueProp : 'field',
            selection : true,
            data : [],
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
        data : React.PropTypes.arrayOf(React.PropTypes.object),
         //add column for selection row
        selection : React.PropTypes.bool,
         //optimization flag. Default is true. Uses memory
        optimization : React.PropTypes.bool
    },
    render : function(){
            var rows = [];
            
            for (var i = 0; i < this.props.data.length; i++) {
            	
            	rows.push(<RTableRow key={'RTableRow_'+i}
                                     rowCount={i} 
                                     data={this.props.data[i]} 
                                     definitions={this.props.definitions} 
                                     dataProp={this.props.dataProp} 
                                     columnFieldValueProp ={this.props.columnFieldValueProp}
                                     optimisation ={this.props.optimisation}></RTableRow>);
            };

            return (<tbody>{rows}</tbody>);
          }
    });

module.exports = RTableBody;