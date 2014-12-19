/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableBody = require('./RTableBody'),
    RTableHeader = require('./RTableHeader');

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
            columnNameProp : 'name'
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
        columnNameProp : React.PropTypes.string
    },
    render : function(){
            var headerRows = [];
            headerRows.push(<RTableHeader key="RTableHeader" definitions={this.state.definitions} columnNameProp={this.props.columnNameProp}></RTableHeader>);
            return (<table className="table rx-table">
                          <thead>
                            {headerRows}
                          </thead>
            		      <RTableBody {...this.props} data={this.state.data} definitions={this.state.definitions}></RTableBody>
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
