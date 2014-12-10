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
            var React = _require(3), pubsub = _require(2), RTableBody = _require(1);
            var RTable = React.createClass({
                    displayName: 'RTable',
                    getDefaultProps: function () {
                        return {
                            data: [],
                            definitions: [],
                            dataProp: '.',
                            columnFieldValueProp: 'field',
                            columnNameProp: 'name'
                        };
                    },
                    propTypes: {
                        //Data array
                        data: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //columns Definitions array
                        definitions: React.PropTypes.oneOfType([
                            React.PropTypes.arrayOf(React.PropTypes.string),
                            React.PropTypes.arrayOf(React.PropTypes.object)
                        ]),
                        //Nested property name of each item in data array where to look for column values. Otherwise root object will be used.  
                        dataProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as property name to look for in data item.
                        columnFieldValueProp: React.PropTypes.string,
                        //Property that will be looked for in each column object to use as column title.
                        columnNameProp: React.PropTypes.string
                    },
                    render: function () {
                        return React.createElement('table', { className: 'table rx-table' }, React.createElement(RTableBody, { data: this.props.data }));
                    }
                });
            module.exports = RTable;
        },
        function (module, exports) {
            /**
 * @jsx React.DOM
 */
            var React = _require(3), pubsub = _require(2);
            var RTableBody = React.createClass({
                    displayName: 'RTableBody',
                    render: function () {
                        var rows = [];
                        for (var i = 0; i < this.props.data.length; i++) {
                            rows.push(React.createElement('td', null, this.props.data[i]));
                        }
                        ;
                        return React.createElement('tbody', null, rows);
                    }
                });
            module.exports = RTable;
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