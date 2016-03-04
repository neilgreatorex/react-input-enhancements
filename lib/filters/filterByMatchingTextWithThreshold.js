'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = filterByMatchingTextWithThreshold;

var _utilsGetOptionText = require('../utils/getOptionText');

var _utilsGetOptionText2 = _interopRequireDefault(_utilsGetOptionText);

var _utilsIsStatic = require('../utils/isStatic');

var _utilsIsStatic2 = _interopRequireDefault(_utilsIsStatic);

function filterByMatchingTextWithThreshold(threshold) {
  return function (options, value) {
    if (!value || threshold && options.length < threshold) return options;
    value = value.toLowerCase();

    return options.filter(function (opt) {
      return (0, _utilsIsStatic2['default'])(opt) || (0, _utilsGetOptionText2['default'])(opt).toLowerCase().indexOf(value) !== -1;
    });
  };
}

module.exports = exports['default'];