/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableBody = require('./RTableBody');

var RTable = React.createClass({
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
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string
    },
    render : function(){
            return (<table className="table rx-table">
            		      <RTableBody data={this.state.data}></RTableBody>
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
