'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = limitBy;

var _utilsIsStatic = require('../utils/isStatic');

var _utilsIsStatic2 = _interopRequireDefault(_utilsIsStatic);

function limitBy(limit) {
  return function (options) {
    return options.slice(0, limit + options.filter(_utilsIsStatic2['default']).length);
  };
}

module.exports = exports['default'];