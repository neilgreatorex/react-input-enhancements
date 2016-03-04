'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sortByMatchingText;

var _lodashSortby = require('lodash.sortby');

var _lodashSortby2 = _interopRequireDefault(_lodashSortby);

var _utilsGetOptionText = require('../utils/getOptionText');

var _utilsGetOptionText2 = _interopRequireDefault(_utilsGetOptionText);

var _utilsIsStatic = require('../utils/isStatic');

var _utilsIsStatic2 = _interopRequireDefault(_utilsIsStatic);

function sortByMatchingText(options, value) {
  value = value && value.toLowerCase();

  return (0, _lodashSortby2['default'])(options, function (opt) {
    if ((0, _utilsIsStatic2['default'])(opt)) {
      return 0;
    }

    var text = (0, _utilsGetOptionText2['default'])(opt).toLowerCase();
    var matching = text.indexOf(value) === 0;
    return matching ? 1 : 2;
  });
}

module.exports = exports['default'];