'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getOptionText;

function getOptionText(opt) {
  if (!opt) return '';

  return [opt, opt.text, opt.label, opt.value].find(function (value) {
    return typeof value === 'string';
  }) || '';
}

module.exports = exports['default'];