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
            enableSelection : true,
            className : ''
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
        enableSelection : React.PropTypes.bool,
        className : React.PropTypes.string
    },
    render : function(){
            var headerRows = [];
            if (this.state.data && this.state.data.length){
                headerRows.push(React.createElement(RTableHeader, {key: "RTableHeader", definitions: this.state.definitions, columnNameProp: this.props.columnNameProp, selection: this.props.enableSelection}));
                if (this.props.enableFilters){
                    headerRows.push(React.createElement(RTableFilter, {key: "RTableFilter", definitions: this.state.definitions, selection: this.props.enableSelection}));
                }
            }
            
            return (React.createElement("table", {className: "rx-table " + this.props.classes}, 
                          React.createElement("thead", null, 
                            headerRows
                          ), 
            		      React.createElement(RTableBody, React.__spread({},  this.props, {selection: this.props.enableSelection, data: this.state.data, definitions: this.state.definitions}))
            	     ));
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
