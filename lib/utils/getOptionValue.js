'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getOptionValue;

function getOptionValue(opt) {
  return typeof opt === 'string' || !opt ? opt : opt.value;
}

module.exports = exports['default'];