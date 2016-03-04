'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$entries = require('babel-runtime/core-js/object/entries')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

require('./utils/getComputedStyle');

var ALLOWED_CSS_PROPS = ['direction', 'fontFamily', 'fontKerning', 'fontSize', 'fontSizeAdjust', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'textAlign', 'textDecoration', 'textTransform', 'wordSpacing'];

var sizersListEl = null;
var sizerContainerStyle = {
  position: 'absolute',
  visibility: 'hidden',
  whiteSpace: 'nowrap',
  width: 'auto',
  minWidth: 'initial',
  maxWidth: 'initial',
  zIndex: 10000,
  left: -1000,
  top: 0
};

var Autosize = (function (_Component) {
  _inherits(Autosize, _Component);

  function Autosize(props) {
    var _this = this;

    _classCallCheck(this, Autosize);

    _get(Object.getPrototypeOf(Autosize.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.handleWindownResize = function () {
      _this.updateWidth(_this.state.value || _this.props.placeholder, _this.state.defaultWidth);
    };

    this.handleChange = function (e) {
      var value = e.target.value;

      if (_this.props.value === undefined) {
        _this.setState({ value: value });
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    this.state = {
      width: props.defaultWidth,
      defaultWidth: props.defaultWidth,
      value: props.value || props.defaultValue
    };
  }

  _createClass(Autosize, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!sizersListEl) {
        sizersListEl = document.createElement('div');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(_Object$entries(sizerContainerStyle)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var val = _step$value[1];

            sizersListEl.style[key] = val;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        sizersListEl.style.whiteSpace = 'pre';
        this.props.getSizerContainer().appendChild(sizersListEl);
      }

      this.sizerEl = document.createElement('span');
      sizersListEl.appendChild(this.sizerEl);

      window.addEventListener('resize', this.handleWindownResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      sizersListEl.removeChild(this.sizerEl);
      if (sizersListEl.childNodes.length === 0) {
        this.props.getSizerContainer().removeChild(sizersListEl);
        sizersListEl = null;
      }
      this.sizerEl = null;

      window.removeEventListener('resize', this.handleWindownResize);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var defaultWidth = this.props.defaultWidth;

      if (defaultWidth === undefined) {
        var input = this.getInput();
        defaultWidth = input.offsetWidth;
        this.setDefaultWidth(defaultWidth);
      }

      this.updateWidth(this.props.value || this.props.placeholder, defaultWidth);
    }
  }, {
    key: 'setDefaultWidth',
    value: function setDefaultWidth(defaultWidth) {
      this.setState({ defaultWidth: defaultWidth });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.value !== this.state.value) {
        this.updateWidth(nextState.value || nextProps.placeholder, nextState.defaultWidth);
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
    key: 'updateWidth',
    value: function updateWidth(value, defaultWidth) {
      var input = this.getInput();
      var inputStyle = window.getComputedStyle(input, null);

      if (!value) {
        this.setState({
          width: defaultWidth
        });
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(_Object$entries(inputStyle)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2);

          var key = _step2$value[0];
          var val = _step2$value[1];

          if (ALLOWED_CSS_PROPS.indexOf(key) !== -1) {
            this.sizerEl.style[key] = val;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.sizerEl.innerText = value;

      this.setState({
        width: Math.max(this.sizerEl.offsetWidth + 1, defaultWidth)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var defaultWidth = _props.defaultWidth;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['defaultWidth', 'children']);

      var width = this.state.width;

      var inputProps = _extends({}, props, {
        style: _extends({}, props.style || {}, width ? { width: width + 'px' } : {}),
        onChange: this.handleChange
      });

      if (typeof children === 'function') {
        return children(inputProps, { width: width });
      } else {
        var input = _react.Children.only(children);

        return _react2['default'].cloneElement(input, _extends({}, inputProps, input.props));
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      value: _react.PropTypes.string,
      defaultWidth: _react.PropTypes.number,
      getInputElement: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      getSizerContainer: function getSizerContainer() {
        return document.body;
      }
    },
    enumerable: true
  }]);

  return Autosize;
})(_react.Component);

exports['default'] = Autosize;
module.exports = exports['default'];