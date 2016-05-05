'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Autosize = require('./Autosize');

var _Autosize2 = _interopRequireDefault(_Autosize);

var Combobox = (function (_Component) {
  _inherits(Combobox, _Component);

  function Combobox() {
    _classCallCheck(this, Combobox);

    _get(Object.getPrototypeOf(Combobox.prototype), 'constructor', this).apply(this, arguments);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(Combobox, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var autosize = _props.autosize;
      var autocomplete = _props.autocomplete;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['autosize', 'autocomplete', 'children']);

      if (autosize && autocomplete) {
        return this.renderAutosizeAutocompleteDropdown(children, props);
      } else if (autosize) {
        return this.renderAutosizeDropdown(children, props);
      } else if (autocomplete) {
        return this.renderAutocompleteDropdown(children, props);
      } else {
        return this.renderDropdown(children, props);
      }
    }
  }, {
    key: 'renderAutosizeAutocompleteDropdown',
    value: function renderAutosizeAutocompleteDropdown(children, props) {
      var _this = this;

      return _react2['default'].createElement(
        _Dropdown2['default'],
        props,
        function (dropdownInputProps) {
          return _react2['default'].createElement(
            _Autocomplete2['default'],
            dropdownInputProps,
            function (inputProps, _ref) {
              var matchingText = _ref.matchingText;
              return _react2['default'].createElement(
                _Autosize2['default'],
                inputProps,
                function (autosizeInputProps, _ref2) {
                  var width = _ref2.width;
                  return _this.renderChildren(children, autosizeInputProps, { matchingText: matchingText, width: width });
                }
              );
            }
          );
        }
      );
    }
  }, {
    key: 'renderAutosizeDropdown',
    value: function renderAutosizeDropdown(children, props) {
      var _this2 = this;

      return _react2['default'].createElement(
        _Dropdown2['default'],
        props,
        function (inputProps, _ref3) {
          var textValue = _ref3.textValue;
          return _react2['default'].createElement(
            _Autosize2['default'],
            _extends({}, inputProps, { value: textValue }),
            function (autosizeInputProps, _ref4) {
              var width = _ref4.width;
              return _this2.renderChildren(children, autosizeInputProps, { width: width });
            }
          );
        }
      );
    }
  }, {
    key: 'renderAutocompleteDropdown',
    value: function renderAutocompleteDropdown(children, props) {
      var _this3 = this;

      return _react2['default'].createElement(
        _Dropdown2['default'],
        props,
        function (dropdownInputProps) {
          return _react2['default'].createElement(
            _Autocomplete2['default'],
            dropdownInputProps,
            function (inputProps, _ref5) {
              var matchingText = _ref5.matchingText;
              return _this3.renderChildren(children, inputProps, { matchingText: matchingText });
            }
          );
        }
      );
    }
  }, {
    key: 'renderDropdown',
    value: function renderDropdown(children, props) {
      var _this4 = this;

      return _react2['default'].createElement(
        _Dropdown2['default'],
        props,
        function (inputProps) {
          return _this4.renderChildren(children, inputProps);
        }
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children, props) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (typeof children === 'function') {
        return children(props, params);
      } else {
        var input = _react.Children.only(children);

        return _react2['default'].cloneElement(input, _extends({}, props, input.props));
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      autosize: _react.PropTypes.bool,
      autocomplete: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  return Combobox;
})(_react.Component);

exports['default'] = Combobox;
module.exports = exports['default'];