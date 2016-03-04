'use strict';

var _reactTransformHmr2 = require('react-transform-hmr');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

var _react = require('react');

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _applyMaskToString = require('./applyMaskToString');

var _applyMaskToString2 = _interopRequireDefault(_applyMaskToString);

var _components = {
  _$Mask: {
    displayName: 'Mask'
  }
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
  filename: 'src/Mask.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

function getStateFromProps(value, props) {
  value = props.onValuePreUpdate(value);
  var processedValue = (0, _applyMaskToString2['default'])(value, props.pattern, props.emptyChar);
  var validatedValue = props.onValidate(value, processedValue);
  if (validatedValue && validatedValue.result) {
    processedValue = validatedValue;
  } else if (validatedValue) {
    processedValue.isValid = false;
  }
  var state = processedValue.isValid ? { value: processedValue.result, lastIndex: processedValue.lastIndex } : {};

  if (!processedValue.unmaskedValue && props.placeholder) {
    state.value = '';
  }

  return [state, processedValue];
}

var Mask = (function (_Component) {
  _inherits(Mask, _Component);

  function Mask(props) {
    var _this = this;

    _classCallCheck(this, _Mask);

    _get(Object.getPrototypeOf(_Mask.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.handleChange = function (e) {
      var value = e.target.value;

      if (_this.props.value === undefined) {
        var processedValue = _this.setValue(value, _this.props);
        if (!processedValue.isValid) {
          e.preventDefault();
          return;
        }

        e.target.value = processedValue.result;

        if (_this.props.onUnmaskedValueChange) {
          _this.props.onUnmaskedValueChange(processedValue.unmaskedValue);
        }
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    var value = props.value || props.defaultValue || '';

    var _getStateFromProps = getStateFromProps(value, props);

    var _getStateFromProps2 = _slicedToArray(_getStateFromProps, 1);

    var state = _getStateFromProps2[0];

    this.state = _extends({
      value: value,
      lastIndex: 0
    }, state);
  }

  _createClass(Mask, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.pattern !== nextProps.pattern || this.props.value !== nextProps.value || this.props.defaultValue !== nextProps.defaultValue || this.props.emptyChar !== nextProps.emptyChar) {
        this.setValue(nextProps.value || nextProps.defaultValue, nextProps);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, props) {
      var _this2 = this;

      var _getStateFromProps3 = getStateFromProps(value, props);

      var _getStateFromProps32 = _slicedToArray(_getStateFromProps3, 2);

      var state = _getStateFromProps32[0];
      var processedValue = _getStateFromProps32[1];

      if (processedValue.isValid) {
        this.setState(state, function () {
          return _this2.setSelectionRange(_this2.state.lastIndex);
        });
      } else {
        this.setSelectionRange(this.state.lastIndex);
      }

      return processedValue;
    }
  }, {
    key: 'setSelectionRange',
    value: function setSelectionRange(lastIndex) {
      var input = this.getInput();
      if (input === document.activeElement) {
        input.setSelectionRange(lastIndex, lastIndex);
        // HACK
        setTimeout(function () {
          return input.setSelectionRange(lastIndex, lastIndex);
        });
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

      var value = this.state.value;

      var inputProps = _extends({}, props, {
        value: value,
        onChange: this.handleChange
      });

      if (typeof children === 'function') {
        return children(inputProps, { value: value });
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
      defaultValue: _react.PropTypes.string,
      pattern: _react.PropTypes.string.isRequired,
      emptyChar: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      emptyChar: ' ',
      onValidate: function onValidate() {},
      onValuePreUpdate: function onValuePreUpdate(v) {
        return v;
      }
    },
    enumerable: true
  }]);

  var _Mask = Mask;
  Mask = _wrapComponent('_$Mask')(Mask) || Mask;
  return Mask;
})(_react.Component);

exports['default'] = Mask;
module.exports = exports['default'];