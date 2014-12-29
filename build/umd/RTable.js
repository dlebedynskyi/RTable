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
            /**
 * @jsx React.DOM
 */
            var React = _require(9), pubsub = _require(8), RTableCell = _require(1);
            RTableSelect = _require(5), utils = _require(7);
            var RTableBody = React.createClass({
                    displayName: 'RTableBody',
                    getInitialState: function () {
                        return {
                            shouldUpdate: true,
                            oldProps: {}
                        };
                    },
                    getDefaultProps: function () {
                        return {
                            dataProp: '.',
                            columnFieldValueProp: 'field',
                            selection: true,
                            data: [],
                            definitions: []
                        };
                    },
                    propTypes: {
                        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
                        dataProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as property name to look for in data item.
                        columnFieldValueProp: React.PropTypes.string,
                        //Definitions for columns
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //Data objects
                        data: React.PropTypes.arrayOf(React.PropTypes.object),
                        //add column for selection row
                        selection: React.PropTypes.bool
                    },
                    componentWillReceiveProps: function (newProps) {
                        var newPropsStr = utils.stringify(newProps), shouldUpdate = this.state.oldProps !== newPropsStr;
                        this.setState({
                            shouldUpdate: shouldUpdate,
                            oldProps: newPropsStr
                        });
                    },
                    shouldComponentUpdate: function (newProps, newState) {
                        return this.state.shouldUpdate;
                    },
                    render: function () {
                        var rows = [];
                        for (var i = 0; i < this.props.data.length; i++) {
                            var cells = [];
                            if (this.props.selection) {
                                cells.push(React.createElement(RTableSelect, {
                                    key: 'row_' + i + '_selection',
                                    data: this.props.data[i]
                                }));
                            }
                            for (var j = 0; j < this.props.definitions.length; j++) {
                                cells.push(React.createElement(RTableCell, {
                                    key: 'row_' + i + '_cell_' + j,
                                    data: this.props.data[i],
                                    definition: this.props.definitions[j],
                                    dataProp: this.props.dataProp,
                                    columnFieldValueProp: this.props.columnFieldValueProp
                                }));
                            }
                            ;
                            rows.push(React.createElement('tr', { key: 'row_' + i }, cells));
                        }
                        ;
                        return React.createElement('tbody', null, rows);
                    }
                });
            module.exports = RTableBody;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), utils = _require(7);
            var RTableCell = React.createClass({
                    displayName: 'RTableCell',
                    getDefaultProps: function () {
                        return {
                            data: {},
                            definition: {},
                            columnFieldValueProp: 'field',
                            dataProp: '.'
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
                        data: React.PropTypes.object
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
                        return React.createElement('td', null, dataObj[def]);
                    }
                });
            module.exports = RTableCell;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), pubsub = _require(8), RTableFilterCell = _require(3);
            function warn() {
                if (console) {
                    console.warn(arguments);
                }
            }
            var RTableFilter = React.createClass({
                    displayName: 'RTableFilter',
                    getDefaultProps: function () {
                        return {
                            definitions: [],
                            selection: true
                        };
                    },
                    propTypes: {
                        //definitions for table filter row
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //add column for selection row
                        selection: React.PropTypes.bool
                    },
                    render: function () {
                        var rows = [];
                        if (this.props.selection) {
                            rows.push(React.createElement('th', {
                                key: 'filter_cell_selection',
                                className: 'rtable-selection-filter'
                            }));
                        }
                        for (var j = 0; j < this.props.definitions.length; j++) {
                            rows.push(React.createElement('th', { key: 'filter_cell_' + j }, React.createElement(RTableFilterCell, { definition: this.props.definitions[j] })));
                        }
                        ;
                        return React.createElement('tr', null, rows);
                    }
                });
            module.exports = RTableFilter;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), pubsub = _require(8);
            var RTableFilterCell = React.createClass({
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
                        return React.createElement('input', {
                            type: 'text',
                            value: this.state.filter,
                            onChange: this.handleChange
                        });
                    }
                });
            module.exports = RTableFilterCell;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), utils = _require(7);
            var RTableHeader = React.createClass({
                    displayName: 'RTableHeader',
                    getDefaultProps: function () {
                        return {
                            definitions: [],
                            columnNameProp: 'name',
                            selection: true
                        };
                    },
                    propTypes: {
                        //definitions for table header row
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string,
                        //add column for selection row
                        selection: React.PropTypes.bool
                    },
                    render: function () {
                        var rows = [];
                        if (this.props.selection) {
                            rows.push(React.createElement('th', {
                                key: 'header_cell_selection',
                                className: 'rtable-selection-header'
                            }));
                        }
                        for (var j = 0; j < this.props.definitions.length; j++) {
                            var header = null;
                            if (typeof this.props.definitions[j] === 'object') {
                                if (!this.props.columnNameProp || !this.props.definitions[j].hasOwnProperty(this.props.columnNameProp)) {
                                    utils.warn('Header Name property was not found on definition object', this.props.definition, this.props.columnNameProp);
                                }
                                header = this.props.definitions[j][this.props.columnNameProp];
                            } else {
                                header = this.props.definitions[j];
                            }
                            rows.push(React.createElement('th', { key: 'header_cell_' + j }, header));
                        }
                        ;
                        return React.createElement('tr', null, rows);
                    }
                });
            module.exports = RTableHeader;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), pubsub = _require(8);
            var RTableSelect = React.createClass({
                    displayName: 'RTableSelect',
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
                        return React.createElement('td', { className: 'rtable-selection-row' }, React.createElement('input', {
                            type: 'checkbox',
                            checked: this.state.isChecked,
                            onChange: this.onChange
                        }));
                    },
                    componentWillUnmount: function () {
                        pubsub.unsubscribe('RTable.RowSelected');
                    }
                });
            module.exports = RTableSelect;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(9), pubsub = _require(8), RTableBody = _require(0), RTableHeader = _require(4), RTableFilter = _require(2);
            var RTable = React.createClass({
                    displayName: 'RTable',
                    getDefaultProps: function () {
                        return {
                            data: [],
                            definitions: [],
                            dataProp: '.',
                            columnFieldValueProp: 'field',
                            columnNameProp: 'name',
                            enableFilters: true,
                            enableSelection: true,
                            className: ''
                        };
                    },
                    componentDidMount: function () {
                        pubsub.publish('RTable.Mounted', null);
                    },
                    componentWillUnmount: function () {
                        pubsub.unsubscribe('RTable.Mounted');
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
                        className: React.PropTypes.string
                    },
                    render: function () {
                        var headerRows = [];
                        if (this.props.data && this.props.data.length) {
                            headerRows.push(React.createElement(RTableHeader, {
                                key: 'RTableHeader',
                                definitions: this.props.definitions,
                                columnNameProp: this.props.columnNameProp,
                                selection: this.props.enableSelection
                            }));
                            if (this.props.enableFilters) {
                                headerRows.push(React.createElement(RTableFilter, {
                                    key: 'RTableFilter',
                                    definitions: this.props.definitions,
                                    selection: this.props.enableSelection
                                }));
                            }
                        }
                        return React.createElement('table', { className: 'rx-table ' + this.props.classes }, React.createElement('thead', null, headerRows), React.createElement(RTableBody, React.__spread({}, this.props, {
                            selection: this.props.enableSelection,
                            data: this.props.data,
                            definitions: this.props.definitions
                        })));
                    }
                });
            module.exports = RTable;
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
    return _require(6);
}));