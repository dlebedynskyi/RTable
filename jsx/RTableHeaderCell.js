/**
 * @jsx React.DOM
 */
var React =  require('react'),
    utils = require('./utils');
    
var RTableHeaderCell = React.createClass({
    displayName : 'RTableHeaderCell',
    getDefaultProps : function  () {
        return {  
            definition : {},
            columnNameProp : 'name'
        };
    },
    propTypes : {
        //definitions for table header row
        definition : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string
    },
    render : function(){
            var header = null;
            if (typeof this.props.definition  === 'object') {
                if (!this.props.columnNameProp ||
                    !this.props.definition.hasOwnProperty(this.props.columnNameProp)){ 
                    utils.warn('Header Name property was not found on definition object', this.props.definition, this.props.columnNameProp);   
                }
                header = this.props.definition[this.props.columnNameProp];
            } else  { header = this.props.definition; }
            
            return (<th className="rtable-column-header">{header}</th>);
          }
    });

module.exports = RTableHeaderCell;
