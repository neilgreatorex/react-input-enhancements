'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var shape = _react.PropTypes.shape;
var oneOfType = _react.PropTypes.oneOfType;
var string = _react.PropTypes.string;
var any = _react.PropTypes.any;
var ITEM = shape({
  text: string,
  label: any,
  value: any
});

exports.ITEM = ITEM;
var ITEM_OR_STRING = oneOfType([ITEM, string]);
exports.ITEM_OR_STRING = ITEM_OR_STRING;