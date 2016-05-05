'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getOptionLabel;

function getOptionLabel(opt, highlighted) {
  return typeof opt === 'string' || !opt ? opt : typeof opt.label === 'function' ? opt.label(opt, highlighted) : opt.label || opt.text || opt.value;
}

module.exports = exports['default'];