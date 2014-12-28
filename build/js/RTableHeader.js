/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js');

function warn(){
    if (console){console.warn(arguments);}
}

var RTableHeader = React.createClass({
    displayName : 'RTableHeader',
    getDefaultProps : function  () {
        return {  
            definitions : [],
            columnNameProp : 'name',
            selection : true
        };
    },
    propTypes : {
        //definitions for table header row
        definitions : React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string), 
            React.PropTypes.arrayOf(React.PropTypes.object)]),
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string,
        //add column for selection row
        selection : React.PropTypes.bool
    },
    render : function(){
            var rows = [];
            if (this.props.selection)
            {
                rows.push(React.createElement("th", {key: "header_cell_selection", className: "rtable-selection-header"}));
            }
        	
            for (var j = 0; j < this.props.definitions.length; j++) {
                    var header = null;
                    if (typeof this.props.definitions[j]  === 'object') {
                        if (!this.props.columnNameProp ||
                            !this.props.definitions[j].hasOwnProperty(this.props.columnNameProp)){ 
                            warn('Header Name property was not found on definition object', this.props.definition, this.props.columnNameProp);   
                        }
                        header = this.props.definitions[j][this.props.columnNameProp];
                    } else  { header = this.props.definitions[j]; }

        			rows.push(React.createElement("th", {key: 'header_cell_'+j}, header))
        		};
            return (React.createElement("tr", null, rows));
          }
    });

module.exports = RTableHeader;