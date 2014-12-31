/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell')
    RTableSelect = require('./RTableSelect'),
    utils = require('./utils');

var RTableRow = React.createClass({
	displayName : 'RTableRow',
    getInitialState : function(){
        return {
            shouldUpdate : true, 
            oldProps : {}
        };
    },
    getDefaultProps : function  () {
        return {  
            dataProp : '.',
            columnFieldValueProp : 'field',
            selection : true,
            data : {},
            definitions : [],
            optimization : true
        };
    },
	propTypes : {
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Definitions for columns
        definitions : React.PropTypes.oneOfType([
        	React.PropTypes.arrayOf(React.PropTypes.string), 
        	React.PropTypes.arrayOf(React.PropTypes.object)]),
        //Data objects
        data : React.PropTypes.object,
         //add column for selection row
        selection : React.PropTypes.bool,
         //optimization flag. Default is true. Uses memory
        optimization : React.PropTypes.bool,
        //row count 
        rowCount : React.PropTypes.number
    },
    componentWillReceiveProps : function(newProps){
        var shouldUpdate = true,
            newPropsStr = null;
        if (this.props.optimization){
            newPropsStr = utils.stringify(newProps);
            shouldUpdate =  this.state.oldProps !== newPropsStr;
        }

        this.setState({shouldUpdate : shouldUpdate, oldProps : newPropsStr});
    },
    shouldComponentUpdate : function(newProps, newState){
        return this.state.shouldUpdate;
    },
    render : function(){
            
            	var cells = [];
                if (this.props.selection){
                    cells.push(<RTableSelect key={'row_'+this.props.rowCount +'_selection'} data={this.props.data}></RTableSelect>);
                }

            	for (var j = 0; j < this.props.definitions.length; j++) {
        			cells.push(<RTableCell key={'row_'+this.props.rowCount+'_cell_'+j} 
                                           data={this.props.data} 
                                           definition={this.props.definitions[j]} 
                                           dataProp={this.props.dataProp} 
                                           columnFieldValueProp ={this.props.columnFieldValueProp}
                                           optimisation ={this.props.optimisation}></RTableCell>)
        		};
            return (<tr>{cells}</tr>)
          }
    });

module.exports = RTableRow;