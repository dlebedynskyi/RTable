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
            var React = _require(7), pubsub = _require(6), RTableBody = _require(1), RTableHeader = _require(5), RTableFilter = _require(3);
            var RTable = React.createClass({
                    displayName: 'RTable',
                    getInitialState: function () {
                        return {
                            data: [],
                            definitions: []
                        };
                    },
                    getDefaultProps: function () {
                        return {
                            dataProp: '.',
                            columnFieldValueProp: 'field',
                            columnNameProp: 'name'
                        };
                    },
                    componentDidMount: function () {
                        var mediator = { reload: this.reload };
                        pubsub.publish('RTable.Mounted', mediator);
                    },
                    componentWillUnmount: function () {
                        pubsub.unsubscribe('RTable.Mounted');
                    },
                    propTypes: {
                        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
                        dataProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as property name to look for in data item.
                        columnFieldValueProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string
                    },
                    render: function () {
                        var headerRows = [];
                        headerRows.push(React.createElement(RTableHeader, {
                            key: 'RTableHeader',
                            definitions: this.state.definitions,
                            columnNameProp: this.props.columnNameProp
                        }));
                        headerRows.push(React.createElement(RTableFilter, {
                            key: 'RTableFilter',
                            definitions: this.state.definitions
                        }));
                        return React.createElement('table', { className: 'table rx-table' }, React.createElement('thead', null, headerRows), React.createElement(RTableBody, React.__spread({}, this.props, {
                            data: this.state.data,
                            definitions: this.state.definitions
                        })));
                    },
                    //custom methods
                    reload: function (newState) {
                        var isreloadRequired = newState && (newState.data || newState.definitions);
                        if (isreloadRequired) {
                            this.setState(newState);
                        }
                        ;
                    }
                });
            module.exports = RTable;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(7), pubsub = _require(6), RTableCell = _require(2);
            var RTableBody = React.createClass({
                    displayName: 'RTableBody',
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
                        data: React.PropTypes.arrayOf(React.PropTypes.object)
                    },
                    render: function () {
                        var rows = [], data = this.props.data && this.props.data.length ? this.props.data : [];
                        for (var i = 0; i < data.length; i++) {
                            var cells = [];
                            for (var j = 0; j < this.props.definitions.length; j++) {
                                cells.push(React.createElement(RTableCell, {
                                    key: 'row_' + i + '_cell_' + j,
                                    data: data[i],
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
            var React = _require(7);
            function warn() {
                if (console) {
                    console.warn(arguments);
                }
            }
            var RTableCell = React.createClass({
                    displayName: 'RTableCell',
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
                                warn('definition property was not found on definition object', this.props.definition, this.props.columnFieldValueProp);
                            }
                            def = this.props.definition[this.props.columnFieldValueProp];
                        } else {
                            def = this.props.definition;
                        }
                        if ('.' !== this.props.dataProp) {
                            if (!this.props.data.hasOwnProperty(this.props.dataProp)) {
                                warn('could not find data propety on object', this.props.data, this.props.dataProp);
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
            var React = _require(7), pubsub = _require(6), RTableFilterCell = _require(4);
            function warn() {
                if (console) {
                    console.warn(arguments);
                }
            }
            var RTableFilter = React.createClass({
                    displayName: 'RTableFilter',
                    getDefaultProps: function () {
                        return { definitions: [] };
                    },
                    propTypes: {
                        //definitions for table filter row
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ])
                    },
                    render: function () {
                        var rows = [];
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
            var React = _require(7), pubsub = _require(6);
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
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ])
                    },
                    handleChange: function (e) {
                        pubsub.publish('RTable.FilterChange', {
                            definition: this.props.definition,
                            value: e.target.value
                        });
                        this.setState({ definition: e.target.value });
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
            var React = _require(7), pubsub = _require(6);
            function warn() {
                if (console) {
                    console.warn(arguments);
                }
            }
            var RTableHeader = React.createClass({
                    displayName: 'RTableHeader',
                    getDefaultProps: function () {
                        return {
                            definitions: [],
                            columnNameProp: 'name'
                        };
                    },
                    propTypes: {
                        //definitions for table header row
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string
                    },
                    render: function () {
                        var rows = [];
                        for (var j = 0; j < this.props.definitions.length; j++) {
                            var header = null;
                            if (typeof this.props.definitions[j] === 'object') {
                                if (!this.props.columnNameProp || !this.props.definitions[j].hasOwnProperty(this.props.columnNameProp)) {
                                    warn('Header Name property was not found on definition object', this.props.definition, this.props.columnNameProp);
                                }
                                header = this.props.definitions[j][this.props.columnNameProp];
                            } else {
                                header = this.props.definitions[j];
                            }
                            rows.push(React.createElement('th', { key: 'header_cell_' + j }, header));
                        }
                        ;
                        rows.push();
                        return React.createElement('tr', null, rows);
                    }
                });
            module.exports = RTableHeader;
        },
        function (module, exports) {
            module.exports = __external_PubSub;
        },
        function (module, exports) {
            module.exports = __external_React;
        }
    ];
    return _require(0);
}));