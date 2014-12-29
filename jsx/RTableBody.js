/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell')
    RTableSelect = require('./RTableSelect'),
    utils = require('./utils');

var RTableBody = React.createClass({
	displayName : 'RTableBody',
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
            data : [],
            definitions : []
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
        data : React.PropTypes.arrayOf(React.PropTypes.object),
         //add column for selection row
        selection : React.PropTypes.bool
    },
    componentWillReceiveProps : function(newProps){
        var newPropsStr = utils.stringify(newProps),
            shouldUpdate = this.state.oldProps !== newPropsStr;
        this.setState({shouldUpdate : shouldUpdate, oldProps : newPropsStr});
    },
    shouldComponentUpdate : function(newProps, newState){
        return this.state.shouldUpdate;
    },
    render : function(){
            var rows = [];
            
            for (var i = 0; i < this.props.data.length; i++) {
            	var cells = [];
                if (this.props.selection)
                {
                    cells.push(<RTableSelect key={'row_'+i +'_selection'} data={this.props.data[i]}></RTableSelect>);
                }

            	for (var j = 0; j < this.props.definitions.length; j++) {
        			cells.push(<RTableCell key={'row_'+i+'_cell_'+j} data={this.props.data[i]} definition={this.props.definitions[j]} dataProp={this.props.dataProp} columnFieldValueProp ={this.props.columnFieldValueProp}></RTableCell>)
            		};

            	rows.push(<tr key={'row_'+i}>{cells}</tr>);
            };

            return (<tbody>{rows}</tbody>);
          }
    });

module.exports = RTableBody;