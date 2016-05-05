'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var DropdownOption = (function (_Component) {
  _inherits(DropdownOption, _Component);

  function DropdownOption() {
    _classCallCheck(this, DropdownOption);

    _get(Object.getPrototypeOf(DropdownOption.prototype), 'constructor', this).apply(this, arguments);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(DropdownOption, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.highlighted) {
        this.scrollToOption();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.highlighted && this.props.highlighted) {
        this.scrollToOption();
      }
    }
  }, {
    key: 'scrollToOption',
    value: function scrollToOption() {
      try {
        var optionEl = (0, _reactDom.findDOMNode)(this);
        if (optionEl) {
          var optionHeight = optionEl.offsetHeight;
          var listEl = optionEl.parentNode;
          var listHeight = listEl.clientHeight;
          listEl.scrollTop = optionEl.offsetTop - (listHeight - optionHeight) / 2;
        }
      } catch (e) {}
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', this.props);
    }
  }], [{
    key: 'propTypes',
    value: {
      highlighted: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  return DropdownOption;
})(_react.Component);

exports['default'] = DropdownOption;
module.exports = exports['default'];