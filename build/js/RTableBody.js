/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js');

var RTableBody = React.createClass({displayName: 'RTableBody',
    render : function(){
            var rows = [];
            for (var i =0; i < this.props.data.length; i++) {
                rows.push(React.createElement("td", null, this.props.data[i]));
            };
            return (React.createElement("tbody", null, rows));
          }
    });

module.exports = RTableBody;
