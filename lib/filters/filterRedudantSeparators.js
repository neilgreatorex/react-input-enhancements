"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = filterRedudantSeparators;

function filterRedudantSeparators(options) {
  var length = options.length;

  return options.filter(function (opt, idx) {
    return opt !== null || idx > 0 && idx !== length - 1 && options[idx - 1] !== null;
  });
}

module.exports = exports["default"];