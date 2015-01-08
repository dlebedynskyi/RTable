/**
 * @jsx React.DOM
 */
var React =  require('react'),
    pubsub = require('pubsub-js'),
    RTableHeaderCell = require('./RTableHeaderCell'),
    RTableFilterCell = require('./RTableFilterCell'),
    RTableSelectCell = require('./RTableSelectCell'),
    RTableCell = require('./RTableCell');

var RTable = {
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
        //clean up
        pubsub.unsubscribe('RTable.Mounted');
        pubsub.unsubscribe('RTable.Updated');
        pubsub.unsubscribe('RTable.BeforeUpdated');
        pubsub.unsubscribe('RTable.Unmounted');

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
            var theadRows = [],
                headers = [], 
                filters = [],
                colGroups = [],
                rows = [],
                classNames = 'rtable ';

            classNames += this.props.fixedHeader ? ' rtable-fixed-header ' : '';
            classNames += this.props.classes;
            if (this.props.data.length){
                this.renderSelectionColumn(colGroups, headers, filters);

                for (var i = 0; i < this.props.definitions.length; i++) {
                    //col groups
                    colGroups.push(<col key={'col_'+i} className={'rtable-col rtable-col-'+i}></col>);
                    //headers
                    headers.push(<RTableHeaderCell key={'header_cell_'+i} 
                                        definition={this.props.definitions[i]} 
                                        columnNameProp={this.props.columnNameProp}></RTableHeaderCell>);
                    //filters
                    filters.push(<RTableFilterCell key={'filter_cell' + i}
                                    definition={this.props.definitions[i]}></RTableFilterCell>);
                    //rows
                    this.renderColumn(rows, i);
                }
                
                theadRows.push(<tr key="rTableHeaderRow">{headers}</tr>);
                
                if (this.props.enableFilters){
                    theadRows.push(<tr key='rtableFilterRow'>{filters}</tr>);
                }
            }

            return (<table className= {classNames} ref='rTable'>

                          <colgroup>{colGroups}</colgroup>
                          <thead ref='rHeader'>{theadRows}</thead>
                          <tbody ref='rBody'>{rows}</tbody>

            	     </table>);
    },
    getInitialRow : function(rowIndex, data){
        var arr = [];
        if (this.props.enableSelection){
            arr.push(<RTableSelectCell key={'row_'+rowIndex+'_select'} data={data}></RTableSelectCell>);
        }
        return arr;
    },
    renderColumn : function(rows, columnIndex){
        for (var j = 0; j < this.props.data.length; j++) {
                        var row = rows[j] = rows[j] || (<tr key={'row_'+j}></tr>);
                        var cells =  row.props.children = row.props.children || this.getInitialRow(j, this.props.data[j]);
                        cells.push(<RTableCell key={'row_'+j+'_cell_'+columnIndex} 
                                        data={this.props.data[j]}
                                        definition={this.props.definitions[columnIndex]}
                                        columnFieldValueProp={this.props.columnFieldValueProp}
                                        dataProp={this.props.dataProp}
                                        optimization={this.props.optimization}></RTableCell>);
                    }
    },
    renderSelectionColumn : function(cols, headers,  filters){
        if (this.props.enableSelection){ 
            cols.push(<col key="col_selection" className="rtable-col rtable-selection"></col>);
            headers.push(<th key="header_cell_selection" className="rtable-selection rtable-column-header"></th>);
            filters.push(<th key="filter_cell_selection" className="rtable-selection rtable-column-filter"></th>);
        }
    }
};

module.exports = {
    class : RTable,
    Component : React.createClass(RTable)
};
