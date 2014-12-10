/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableBody = require('./RTableBody');

var RTable = React.createClass({
    getDefaultProps : function  () {
        return {
            data : [],
            definitions : [],
            dataProp : '.',
            columnFieldValueProp : 'field',
            columnNameProp : 'name'
        };
    },
    propTypes : {
        //Data array
        data : React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string), 
            React.PropTypes.arrayOf(React.PropTypes.object)]),
        
        //columns Definitions array
        definitions : React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string), 
            React.PropTypes.arrayOf(React.PropTypes.object)]),

        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string
    },
    render : function(){
            return (<table className="table rx-table">
            		      <RTableBody data={this.props.data}></RTableBody>
            	     </table>);
          }
    });

module.exports = RTable;
