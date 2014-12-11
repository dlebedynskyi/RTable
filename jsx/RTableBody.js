/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableCell = require('./RTableCell');

var RTableBody = React.createClass({
    render : function(){
            var rows = [],
            	data = this.props.data && this.props.data.length ? this.props.data : [];
            
            for (var i = 0; i < data.length; i++) {
            	var cells = [];
            	for (var j = 0; j < this.props.definitions.length; j++) {
            			cells.push(<RTableCell key={'row_'+i+'_cell_'+j} data={data[i]} definition={this.props.definitions[j]} dataProp={this.props.dataProp} columnFieldValueProp ={this.props.columnFieldValueProp}></RTableCell>)
            		};

            	rows.push(<tr key={'row_'+i}>{cells}</tr>);
            };

            return (<tbody>{rows}</tbody>);
          }
    });

module.exports = RTableBody;
