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
    _require.modules = [function (module, exports) {
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
        }];
    return _require(0);
}));