'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _shapes = require('./shapes');

var shapes = _interopRequireWildcard(_shapes);

var _utilsFindMatchingTextIndex = require('./utils/findMatchingTextIndex');

var _utilsFindMatchingTextIndex2 = _interopRequireDefault(_utilsFindMatchingTextIndex);

function setSelection(input, text, matchingText) {
  if (text === null) {
    input.value = null;
  } else {
    input.value = matchingText;
    if (text.length !== matchingText.length) {
      input.setSelectionRange(text.length, matchingText.length);
    }
  }
}

var Autocomplete = (function (_Component) {
  _inherits(Autocomplete, _Component);

  function Autocomplete(props) {
    var _this = this;

    _classCallCheck(this, Autocomplete);

    _get(Object.getPrototypeOf(Autocomplete.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.handleSelectionChange = function () {
      var input = _this.getInput();
      if (input.selectionStart === input.selectionEnd && input.value !== _this.state.value) {
        _this.setValue(input.value, _this.props.options);
      }
    };

    this.handleChange = function (e) {
      var value = e.target.value;

      _this.setValue(value, _this.props.options);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    this.handleKeyDown = function (e) {
      var keyMap = {
        Backspace: _this.handleBackspaceKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    this.handleBackspaceKeyDown = function () {
      var input = _this.getInput();
      if (input.selectionStart !== input.selectionEnd && input.selectionEnd === input.value.length && input.selectionStart !== 0) {
        input.value = input.value.substr(0, input.selectionStart);
      }
    };

    this.handleEnterKeyDown = function () {
      var input = _this.getInput();

      setSelection(input, _this.state.matchingText, _this.state.matchingText);
      input.blur();
    };

    this.state = {
      matchingText: null,
      value: props.value || props.defaultValue
    };
  }

  _createClass(Autocomplete, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('selectionchange', this.handleSelectionChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('selectionchange', this.handleSelectionChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setValue(nextProps.value, nextProps.options);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.options !== nextProps.options && this.props.value === nextProps.value) {
        var match = (0, _utilsFindMatchingTextIndex2['default'])(nextState.value, nextProps.options);

        var _match = _slicedToArray(match, 2);

        var matchingText = _match[1];

        this.setState({ matchingText: matchingText });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, options) {
      var match = (0, _utilsFindMatchingTextIndex2['default'])(value, options);

      var _match2 = _slicedToArray(match, 2);

      var matchingText = _match2[1];

      this.setState({ value: value, matchingText: matchingText });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.value !== prevState.value || this.state.matchingText !== prevState.matchingText) {
        if (this.state.matchingText) {
          var input = this.getInput();
          setSelection(input, this.state.value, this.state.matchingText);
        }
      }
    }
  }, {
    key: 'getInput',
    value: function getInput() {
      if (this.props.getInputElement) {
        return this.props.getInputElement();
      }

      var el = _reactDom2['default'].findDOMNode(this);
      return el.tagName === 'INPUT' ? el : el.getElementsByTagName('INPUT')[0];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      var _state = this.state;
      var matchingText = _state.matchingText;
      var value = _state.value;

      var inputProps = _extends({}, props, {
        value: matchingText || value,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange
      });

      if (typeof children === 'function') {
        return children(inputProps, { matchingText: matchingText, value: value });
      } else {
        var input = _react.Children.only(children);
        return _react2['default'].cloneElement(input, _extends({}, inputProps, input.props));
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      getInputElement: _react.PropTypes.func,
      value: _react.PropTypes.string,
      options: _react.PropTypes.arrayOf(shapes.ITEM_OR_STRING)
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {},
    enumerable: true
  }]);

  return Autocomplete;
})(_react.Component);

exports['default'] = Autocomplete;
module.exports = exports['default'];