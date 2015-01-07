/**
 * @jsx React.DOM
 */
var React = require('react'),
    pubsub = require('pubsub-js');

var RTableSelect = React.createClass({
	displayName : 'RTableSelect',
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
    		return (React.createElement("td", {className: "rtable-col rtable-selection rtable-selection-row"}, React.createElement("input", {type: "checkbox", checked: this.state.isChecked, onChange: this.onChange})));
    },
  componentWillUnmount : function(){
      pubsub.unsubscribe('RTable.RowSelected');
    }});

module.exports = RTableSelect;
