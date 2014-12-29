/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableBody = require('./RTableBody'),
    RTableHeader = require('./RTableHeader'),
    RTableFilter = require('./RTableFilter');

var RTable = React.createClass({
    displayName : 'RTable',
    getDefaultProps : function  () {
        return {  
        	data : [],
        	definitions : [],
            dataProp : '.',
            columnFieldValueProp : 'field',
            columnNameProp : 'name', 
            enableFilters : true,
            enableSelection : true,
            className : ''
        };
    },
    componentDidMount : function() {
        pubsub.publish('RTable.Mounted', null);
    },
    componentWillUnmount : function(){
        pubsub.unsubscribe('RTable.Mounted');
    },
    propTypes : {
    	 //Definitions for columns
        definitions : React.PropTypes.oneOfType([
        	React.PropTypes.arrayOf(React.PropTypes.string), 
        	React.PropTypes.arrayOf(React.PropTypes.object)]),
        //Data objects
        data : React.PropTypes.arrayOf(React.PropTypes.object),
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string, 
        //should show filters 
        enableFilters : React.PropTypes.bool,
        //should show row selection checkboxes
        enableSelection : React.PropTypes.bool,
        //css class names to be added
        className : React.PropTypes.string
    },
    render : function(){

            var headerRows = [];
            if (this.props.data && this.props.data.length){
                headerRows.push(<RTableHeader key="RTableHeader" definitions={this.props.definitions} columnNameProp={this.props.columnNameProp} selection={this.props.enableSelection}></RTableHeader>);
                if (this.props.enableFilters){
                    headerRows.push(<RTableFilter key="RTableFilter" definitions={this.props.definitions} selection={this.props.enableSelection}></RTableFilter>);
                }
            }
            
            return (<table className= {"rx-table " + this.props.classes}>
                          <thead>
                            {headerRows}
                          </thead>
            		      <RTableBody {...this.props} selection ={this.props.enableSelection} data={this.props.data} definitions={this.props.definitions}></RTableBody>
            	     </table>);
    }
});

module.exports = RTable;
