"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isStatic;

function isStatic(opt) {
  return opt === null || opt && opt["static"] === true;
}

module.exports = exports["default"];