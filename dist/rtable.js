(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
            'react',
            'pubsub-js'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('react'), require('pubsub-js'));
    } else {
        // Browser globals
        this.RTable = factory(React, PubSub);
    }
}(function (__external_React, __external_PubSub) {
    var global = this, define;
    function _require(id) {
        var module = _require.cache[id];
        if (!module) {
            var exports = {};
            module = _require.cache[id] = {
                id: id,
                exports: exports
            };
            _require.modules[id].call(exports, module, exports);
        }
        return module.exports;
    }
    _require.cache = [];
    _require.modules = [
        function (module, exports) {
            /*

Provides comparation of old and new properties for shouldComponentUpdate method by using JSON.strinify comparation. 
This provides deep comparation for properties with arrays and objects. 

NOTE ANY METHODs will be ignored
NOTE  ORDER MATTERS {a :'1', b : '2'} will be FALSE to {b : '2', a : '1'}

Author : Dmytro Lebedynskyi

Why ?

If your React component's render function is "pure" (in other words, it renders the same result given the same props and state),
 you can use this mixin for a performance boost in some cases.

 */
            var PropRenderMixin = {
                    componentWillMount: function () {
                        this.shouldUpdate = true;
                        this.oldProps = null;
                    },
                    componentWillReceiveProps: function (newProps) {
                        var shouldUpdate = true, newPropsStr = null;
                        if (this.props.optimization) {
                            newPropsStr = JSON.stringify(newProps);
                            shouldUpdate = this.oldProps !== newPropsStr;
                        }
                        this.shouldUpdate = shouldUpdate;
                        this.oldProps = newPropsStr;
                    },
                    shouldComponentUpdate: function (newProps, newState) {
                        return this.shouldUpdate;
                    }
                };
            module.exports = PropRenderMixin;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(8), utils = _require(6);
            var RTableCell = {
                    displayName: 'RTableCell',
                    getDefaultProps: function () {
                        return {
                            data: {},
                            definition: {},
                            columnFieldValueProp: 'field',
                            dataProp: '.',
                            optimization: true
                        };
                    },
                    propTypes: {
                        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
                        dataProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as property name to look for in data item.
                        columnFieldValueProp: React.PropTypes.string,
                        //Definition for column
                        definition: React.PropTypes.oneOfType([
                            React.PropTypes.string,
                            React.PropTypes.object
                        ]),
                        //Data object. will use dataProp to look for display values. Value will be taken based on columnFieldValueProp value of definition object
                        data: React.PropTypes.object,
                        //optimisation flag. Default is true. Uses memory
                        optimization: React.PropTypes.bool
                    },
                    render: function () {
                        var def = null, dataObj = null;
                        if (typeof this.props.definition === 'object') {
                            if (!this.props.columnFieldValueProp || !this.props.definition.hasOwnProperty(this.props.columnFieldValueProp)) {
                                utils.warn('definition property was not found on definition object', this.props.definition, this.props.columnFieldValueProp);
                            }
                            def = this.props.definition[this.props.columnFieldValueProp];
                        } else {
                            def = this.props.definition;
                        }
                        if ('.' !== this.props.dataProp) {
                            if (!this.props.data.hasOwnProperty(this.props.dataProp)) {
                                utils.warn('could not find data propety on object', this.props.data, this.props.dataProp);
                            }
                            dataObj = this.props.data[this.props.dataProp];
                        } else {
                            dataObj = this.props.data;
                        }
                        return React.createElement('td', { className: 'rtable-column-body' }, dataObj[def]);
                    }
                };
            module.exports = {
                class: RTableCell,
                Component: React.createClass(RTableCell)
            };
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(8), pubsub = _require(7);
            var RTableFilterCell = {
                    displayName: 'RTableFilterCell',
                    getInitialState: function () {
                        return { filter: null };
                    },
                    getDefaultProps: function () {
                        return { definition: {} };
                    },
                    propTypes: {
                        //definitions for table filter row
                        definition: React.PropTypes.oneOfType([
                            React.PropTypes.string,
                            React.PropTypes.object
                        ])
                    },
                    handleChange: function (e) {
                        pubsub.publish('RTable.FilterChange', {
                            definition: this.props.definition,
                            value: e.target.value
                        });
                        this.setState({ definition: e.target.value });
                    },
                    componentWillUnmount: function () {
                        pubsub.unsubscribe('RTable.FilterChange');
                    },
                    render: function () {
                        return React.createElement('th', { className: 'rtable-column-filter' }, React.createElement('input', {
                            type: 'text',
                            value: this.state.filter,
                            onChange: this.handleChange
                        }));
                    }
                };
            module.exports = {
                class: RTableFilterCell,
                Component: React.createClass(RTableFilterCell)
            };
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(8), utils = _require(6);
            var RTableHeaderCell = {
                    displayName: 'RTableHeaderCell',
                    getDefaultProps: function () {
                        return {
                            definition: {},
                            columnNameProp: 'name'
                        };
                    },
                    propTypes: {
                        //definitions for table header row
                        definition: React.PropTypes.oneOfType([
                            React.PropTypes.string,
                            React.PropTypes.object
                        ]),
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string
                    },
                    render: function () {
                        var header = null;
                        if (typeof this.props.definition === 'object') {
                            if (!this.props.columnNameProp || !this.props.definition.hasOwnProperty(this.props.columnNameProp)) {
                                utils.warn('Header Name property was not found on definition object', this.props.definition, this.props.columnNameProp);
                            }
                            header = this.props.definition[this.props.columnNameProp];
                        } else {
                            header = this.props.definition;
                        }
                        return React.createElement('th', { className: 'rtable-column-header' }, header);
                    }
                };
            module.exports = {
                class: RTableHeaderCell,
                Component: React.createClass(RTableHeaderCell)
            };
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(8), pubsub = _require(7);
            var RTableSelectCell = {
                    displayName: 'RTableSelectCell',
                    getInitialState: function () {
                        return { isChecked: false };
                    },
                    getDefaultProps: function () {
                        return { data: {} };
                    },
                    propTypes: {
                        //Data object. will use dataProp to look for display values. Value will be taken based on columnFieldValueProp value of definition object
                        data: React.PropTypes.object
                    },
                    onChange: function (e) {
                        var checked = !this.state.isChecked;
                        pubsub.publish('RTable.RowChecked', {
                            data: this.props.data,
                            value: checked
                        });
                        this.setState({ isChecked: checked });
                    },
                    render: function () {
                        return React.createElement('td', { className: 'rtable-selection rtable-column-body' }, React.createElement('input', {
                            type: 'checkbox',
                            checked: this.state.isChecked,
                            onChange: this.onChange
                        }));
                    },
                    componentWillUnmount: function () {
                        pubsub.unsubscribe('RTable.RowSelected');
                    }
                };
            module.exports = {
                class: RTableSelectCell,
                Component: React.createClass(RTableSelectCell)
            };
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(8), pubsub = _require(7), RTableHeaderCell = _require(3).Component, RTableFilterCell = _require(2).Component, RTableSelectCell = _require(4).Component, RTableCell = _require(1).Component, PropRenderMixin = _require(0);
            var RTable = {
                    displayName: 'RTable',
                    mixins: [PropRenderMixin],
                    getDefaultProps: function () {
                        return {
                            data: [],
                            definitions: [],
                            dataProp: '.',
                            columnFieldValueProp: 'field',
                            columnNameProp: 'name',
                            enableFilters: true,
                            enableSelection: true,
                            classes: 'rtable',
                            optimization: true,
                            fixedHeader: false
                        };
                    },
                    tableScroll: function (e) {
                        this.refs.rHeader.getDOMNode().style.width = this.refs.rTable.getDOMNode().clientWidth + this.refs.rTable.getDOMNode().scrollLeft + 'px';
                        this.refs.rBody.getDOMNode().style.width = this.refs.rTable.getDOMNode().clientWidth + this.refs.rTable.getDOMNode().scrollLeft + 'px';
                    },
                    componentDidMount: function () {
                        pubsub.publish('RTable.Mounted', null);
                        if (this.props.fixedHeader) {
                            this.refs.rTable.getDOMNode().addEventListener('scroll', this.tableScroll);
                        }
                    },
                    componentWillUpdate: function () {
                        pubsub.publish('RTable.BeforeUpdated', null);
                    },
                    componentDidUpdate: function () {
                        pubsub.publish('RTable.Updated', null);
                    },
                    componentWillUnmount: function () {
                        pubsub.publish('RTable.Unmounted', null);    //clean up.
                        //clean up.
                        pubsub.unsubscribe('RTable.Mounted');
                        pubsub.unsubscribe('RTable.Updated');
                        pubsub.unsubscribe('RTable.BeforeUpdated');
                        pubsub.unsubscribe('RTable.Unmounted');
                        this.refs.rTable.getDOMNode().removeEventListener('scroll', this.tableScroll);
                    },
                    propTypes: {
                        //Definitions for columns
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //Data objects
                        data: React.PropTypes.arrayOf(React.PropTypes.object),
                        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
                        dataProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as property name to look for in data item.
                        columnFieldValueProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string,
                        //should show filters 
                        enableFilters: React.PropTypes.bool,
                        //should show row selection checkboxes
                        enableSelection: React.PropTypes.bool,
                        //css class names to be added
                        classes: React.PropTypes.string,
                        //optimization flag. Default is true. Uses memory
                        optimization: React.PropTypes.bool,
                        //should table apply fixed header and only body content scrolling 
                        fixedHeader: React.PropTypes.bool
                    },
                    render: function () {
                        var theadRows = [], headers = [], filters = [], colGroups = [], rows = [], classNames = 'rtable ';
                        classNames += this.props.fixedHeader ? ' rtable-fixed-header ' : '';
                        classNames += this.props.classes;
                        if (this.props.data.length) {
                            this.renderSelectionColumn(colGroups, headers, filters);
                            for (var i = 0; i < this.props.definitions.length; i++) {
                                //col groups
                                colGroups.push(React.createElement('col', {
                                    key: 'col_' + i,
                                    className: 'rtable-col rtable-col-' + i
                                }));    //headers
                                //headers
                                headers.push(React.createElement(RTableHeaderCell, {
                                    key: 'header_cell_' + i,
                                    definition: this.props.definitions[i],
                                    columnNameProp: this.props.columnNameProp
                                }));    //filters
                                //filters
                                filters.push(React.createElement(RTableFilterCell, {
                                    key: 'filter_cell' + i,
                                    definition: this.props.definitions[i]
                                }));    //rows
                                //rows
                                this.renderColumn(rows, i);
                            }
                            theadRows.push(React.createElement('tr', { key: 'rTableHeaderRow' }, headers));
                            if (this.props.enableFilters) {
                                theadRows.push(React.createElement('tr', { key: 'rtableFilterRow' }, filters));
                            }
                        }
                        return React.createElement('table', {
                            className: classNames,
                            ref: 'rTable'
                        }, React.createElement('colgroup', null, colGroups), React.createElement('thead', { ref: 'rHeader' }, theadRows), React.createElement('tbody', { ref: 'rBody' }, rows));
                    },
                    getInitialRow: function (rowIndex, data) {
                        var arr = [];
                        if (this.props.enableSelection) {
                            arr.push(React.createElement(RTableSelectCell, {
                                key: 'row_' + rowIndex + '_select',
                                data: data
                            }));
                        }
                        return arr;
                    },
                    renderColumn: function (rows, columnIndex) {
                        for (var j = 0; j < this.props.data.length; j++) {
                            var row = rows[j] = rows[j] || React.createElement('tr', { key: 'row_' + j });
                            var cells = row.props.children = row.props.children || this.getInitialRow(j, this.props.data[j]);
                            cells.push(React.createElement(RTableCell, {
                                key: 'row_' + j + '_cell_' + columnIndex,
                                data: this.props.data[j],
                                definition: this.props.definitions[columnIndex],
                                columnFieldValueProp: this.props.columnFieldValueProp,
                                dataProp: this.props.dataProp,
                                optimization: this.props.optimization
                            }));
                        }
                    },
                    renderSelectionColumn: function (cols, headers, filters) {
                        if (this.props.enableSelection) {
                            cols.push(React.createElement('col', {
                                key: 'col_selection',
                                className: 'rtable-col rtable-selection'
                            }));
                            headers.push(React.createElement('th', {
                                key: 'header_cell_selection',
                                className: 'rtable-selection rtable-column-header'
                            }));
                            filters.push(React.createElement('th', {
                                key: 'filter_cell_selection',
                                className: 'rtable-selection rtable-column-filter'
                            }));
                        }
                    }
                };
            module.exports = {
                class: RTable,
                Component: React.createClass(RTable)
            };
        },
        function (module, exports) {
            var utils = {};
            utils.stringify = function (oldObj) {
                return JSON.stringify(oldObj);
            };
            utils.cloneProps = function (oldObj) {
                return JSON.parse(JSON.stringify(oldObj));
            };
            utils.equalProps = function (oldObj, newObj) {
                return JSON.stringify(oldObj) === JSON.stringify(newObj);
            };
            utils.warn = function () {
                if (console) {
                    console.warn(arguments);
                }
            };
            module.exports = utils;
        },
        function (module, exports) {
            module.exports = __external_PubSub;
        },
        function (module, exports) {
            module.exports = __external_React;
        }
    ];
    return _require(5);
}));