'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = notFoundMessage;

var _utilsIsStatic = require('../utils/isStatic');

var _utilsIsStatic2 = _interopRequireDefault(_utilsIsStatic);

function getEmptyOption(message) {
  return { label: message, 'static': true, disabled: true };
}

function notFoundMessage(message, ignoreStatic) {
  return function (options, value) {
    if (!ignoreStatic) {
      return options.length === 0 && value ? [getEmptyOption(message)] : options;
    }

    var staticOptions = options.filter(_utilsIsStatic2['default']);

    return options.length === staticOptions.length && value ? [].concat(_toConsumableArray(staticOptions), [getEmptyOption(message)]) : options;
  };
}

module.exports = exports['default'];