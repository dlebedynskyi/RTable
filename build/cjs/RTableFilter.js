/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableFilterCell = require('./RTableFilterCell');

function warn(){
    if (console){console.warn(arguments);}
}

var RTableFilter = React.createClass({
    displayName : 'RTableFilter',
    getDefaultProps : function  () {
        return {  
            definitions : [],
            selection : true
        };
    },
    propTypes : {
        //definitions for table filter row
        definitions : React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string), 
            React.PropTypes.arrayOf(React.PropTypes.object)]),
        //add column for selection row
        selection : React.PropTypes.bool
    },
    render : function(){
        var rows = [];
        if (this.props.selection)
        {
            rows.push(React.createElement("th", {key: "filter_cell_selection", className: "rtable-selection rtable-selection-filter rtable-col"}));
        }
        
    	for (var j = 0; j < this.props.definitions.length; j++) {
    			rows.push(React.createElement("th", {key: 'filter_cell_'+j, className: "rtable-col"}, React.createElement(RTableFilterCell, {definition: this.props.definitions[j]})));
		}
            
        return (React.createElement("tr", {className: "rtable-header-filters"}, rows));
    }
});

module.exports = RTableFilter;