/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js');

var RTableFilterCell = React.createClass({
    displayName : 'RTableFilterCell',
    getInitialState : function(){
        return { filter : null};
    },
    getDefaultProps : function  () {
        return {  
            definition : {}
        };
    },
    propTypes : {
        //definitions for table filter row
        definition : React.PropTypes.oneOfType([
            React.PropTypes.string, 
            React.PropTypes.object])
    },
    handleChange : function (e){
        pubsub.publish('RTable.FilterChange', 
        {
            definition : this.props.definition,
            value : e.target.value
        });
        
        this.setState({definition : e.target.value});
    },
    componentWillUnmount : function(){
        pubsub.unsubscribe('RTable.FilterChange');
    },
    render : function(){
            return (React.createElement("th", {className: "rtable-column-filter"}, React.createElement("input", {type: "text", value: this.state.filter, onChange: this.handleChange})));
          }
    });

module.exports = RTableFilterCell;
