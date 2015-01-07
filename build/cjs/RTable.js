/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableBody = require('./RTableBody'),
    RTableHeader = require('./RTableHeader'),
    RTableFilter = require('./RTableFilter');

var RTable = React.createClass({
    displayName : 'RTable',
    getDefaultProps : function  () {
        return {  
        	data : [],
        	definitions : [],
            dataProp : '.',
            columnFieldValueProp : 'field',
            columnNameProp : 'name', 
            enableFilters : true,
            enableSelection : true,
            classes : 'rtable',
            optimization : true, 
            fixedHeader : false
        };
    },
    tableScroll : function(e){
        this.refs.rHeader.getDOMNode().style.width = this.refs.rTable.getDOMNode().clientWidth + this.refs.rTable.getDOMNode().scrollLeft + 'px';
        this.refs.rBody.getDOMNode().style.width = this.refs.rTable.getDOMNode().clientWidth + this.refs.rTable.getDOMNode().scrollLeft + 'px';
    },
    componentDidMount : function() {
        pubsub.publish('RTable.Mounted', null);

        if (this.props.fixedHeader){
            this.refs.rTable.getDOMNode()
            .addEventListener('scroll', this.tableScroll);
        }
    },
    componentWillUpdate : function(){
        pubsub.publish('RTable.BeforeUpdated', null);
    },
    componentDidUpdate : function  () {
        pubsub.publish('RTable.Updated', null);
    },
    componentWillUnmount : function(){
        pubsub.publish('RTable.Unmounted', null);
        pubsub.unsubscribe('RTable.Mounted');

        this.refs.rTable.getDOMNode()
        .removeEventListener('scroll', this.tableScroll);
    },
    propTypes : {
    	 //Definitions for columns
        definitions : React.PropTypes.oneOfType([
        	React.PropTypes.arrayOf(React.PropTypes.string), 
        	React.PropTypes.arrayOf(React.PropTypes.object)]),
        //Data objects
        data : React.PropTypes.arrayOf(React.PropTypes.object),
        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
        dataProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as property name to look for in data item.
        columnFieldValueProp : React.PropTypes.string,
        //Property that will be looked for in each column object to use as column title.
        columnNameProp : React.PropTypes.string, 
        //should show filters 
        enableFilters : React.PropTypes.bool,
        //should show row selection checkboxes
        enableSelection : React.PropTypes.bool,
        //css class names to be added
        classes : React.PropTypes.string,
        //optimization flag. Default is true. Uses memory
        optimization : React.PropTypes.bool, 
        //should table apply fixed header and only body content scrolling 
        fixedHeader : React.PropTypes.bool
    },
    render : function(){

            var headerRows = [];
            if (this.props.data && this.props.data.length){
                headerRows.push(React.createElement(RTableHeader, {key: "RTableHeader", definitions: this.props.definitions, columnNameProp: this.props.columnNameProp, selection: this.props.enableSelection}));
                if (this.props.enableFilters){
                    headerRows.push(React.createElement(RTableFilter, {key: "RTableFilter", definitions: this.props.definitions, selection: this.props.enableSelection}));
                }
            }
            
            var thead = (React.createElement("thead", {ref: "rHeader"}, headerRows));
            var classNames = 'rtable '  + this.props.classes;
            if (this.props.fixedHeader){
                classNames += ' rtable-fixed-header';
            }
            return (React.createElement("table", {className: classNames, ref: "rTable"}, 
                          thead, 
            		      React.createElement(RTableBody, React.__spread({ref: "rBody"},  this.props, {selection: this.props.enableSelection, data: this.props.data, definitions: this.props.definitions}))
            	     ));
    }
});

module.exports = RTable;
