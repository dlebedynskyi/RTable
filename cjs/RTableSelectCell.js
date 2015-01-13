/**
 * @jsx React.DOM
 */
var React = require('react'),
    pubsub = require('pubsub-js');

var RTableSelectCell ={
  displayName : 'RTableSelectCell',
  getInitialState : function(){
        return { isChecked : false};
    },
  getDefaultProps : function  () {
        return {  
            data : {}
        };
    },
  propTypes : {
        //Data object. will use dataProp to look for display values. Value will be taken based on columnFieldValueProp value of definition object
        data : React.PropTypes.object
    },
  onChange : function(e){
    var checked = !this.state.isChecked;
    pubsub.publish('RTable.RowChecked', 
        {
            data : this.props.data,
            value : checked
        });
    this.setState({isChecked: checked});
  },
  render : function(){ 
        return (React.createElement("td", {className: "rtable-selection rtable-column-body"}, React.createElement("input", {type: "checkbox", checked: this.state.isChecked, onChange: this.onChange})));
    },
  componentWillUnmount : function(){
      pubsub.unsubscribe('RTable.RowSelected');
    }
}; 

module.exports = { class : RTableSelectCell, Component : React.createClass(RTableSelectCell)};
