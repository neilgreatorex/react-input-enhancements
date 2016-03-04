'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = findMatchingTextIndex;

var _getOptionText = require('./getOptionText');

var _getOptionText2 = _interopRequireDefault(_getOptionText);

function findMatchingTextIndex(value, options, allMatches) {
  var lowerText = value && value.toLowerCase();

  var foundOptions = options.reduce(function (opts, opt, idx) {
    var optValue = opt && opt.hasOwnProperty('value') ? opt.value : typeof opt === 'string' ? opt : null;
    var optText = (0, _getOptionText2['default'])(opt);
    var matchPosition = optText.toLowerCase().indexOf(lowerText);

    if (optValue === value && opt !== null || optText && lowerText && (allMatches ? matchPosition !== -1 : matchPosition === 0)) {

      return [].concat(_toConsumableArray(opts), [[idx, optText, optValue, matchPosition, optText.toLowerCase()]]);
    }

    return opts;
  }, []);

  foundOptions.sort(function (a, b) {
    return a[3] - b[3] || (a[4] > b[4] ? 1 : -1);
  });

  return foundOptions.length ? foundOptions[0] : [null, null, null];
}

module.exports = exports['default'];