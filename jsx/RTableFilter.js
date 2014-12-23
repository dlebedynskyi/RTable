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
            definitions : []
        };
    },
    propTypes : {
        //definitions for table filter row
        definitions : React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string), 
            React.PropTypes.arrayOf(React.PropTypes.object)])
    },
    render : function(){
            var rows = [];
            	for (var j = 0; j < this.props.definitions.length; j++) {
            			rows.push(<th key={'filter_cell_'+j}><RTableFilterCell definition={this.props.definitions[j]}></RTableFilterCell></th>)
            		};
            return (<tr>{rows}</tr>);
          }
    });

module.exports = RTableFilter;
