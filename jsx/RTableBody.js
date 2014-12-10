/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js');

var RTableBody = React.createClass({
    render : function(){
            var rows = [];
            for (var i =0; i < this.props.data.length; i++) {
                rows.push(<td>{this.props.data[i]}</td>);
            };
            return (<tbody>{rows}</tbody>);
          }
    });

module.exports = RTableBody;
