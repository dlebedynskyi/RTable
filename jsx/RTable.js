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
    getInitialState : function(){
        return {
            data : [],
            definitions : []
        };
    },
    getDefaultProps : function  () {
        return {  
            dataProp : '.',
            columnFieldValueProp : 'field',
            columnNameProp : 'name', 
            enableFilters : true,
            enableSelection : true
        };
    },
    componentDidMount : function() {
        var mediator = {
            reload : this.reload
        };
        pubsub.publish('RTable.Mounted', mediator);
    },
    componentWillUnmount : function(){
        pubsub.unsubscribe('RTable.Mounted');
    },
    propTypes : {
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string, 
        //should show filters 
        enableFilters : React.PropTypes.bool,
        //should show row selection checkboxes
        enableSelection : React.PropTypes.bool
    },
    render : function(){
            var headerRows = [];
            headerRows.push(<RTableHeader key="RTableHeader" definitions={this.state.definitions} columnNameProp={this.props.columnNameProp} selection={this.props.enableSelection}></RTableHeader>);
            if (this.props.enableFilters){
                headerRows.push(<RTableFilter key="RTableFilter" definitions={this.state.definitions} selection={this.props.enableSelection}></RTableFilter>);
            }
            return (<table className="table rx-table">
                          <thead>
                            {headerRows}
                          </thead>
            		      <RTableBody {...this.props} selection ={this.props.enableSelection} data={this.state.data} definitions={this.state.definitions}></RTableBody>
            	     </table>);
    },
//custom methods
    reload : function(newState) {
        var isreloadRequired = newState && (newState.data  || newState.definitions);
        if (isreloadRequired) {
            this.setState(newState);
        };
    }
});

module.exports = RTable;
