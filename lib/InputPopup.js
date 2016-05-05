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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jss = require('jss');

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var jss = (0, _jss.create)();
jss.use((0, _jssNested2['default'])());
jss.use((0, _jssVendorPrefixer2['default'])());

var InputPopup = (function (_Component) {
  _inherits(InputPopup, _Component);

  function InputPopup(props) {
    var _this = this;

    _classCallCheck(this, InputPopup);

    _get(Object.getPrototypeOf(InputPopup.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.handleMouseEnter = function (e) {
      _this.setState({ hover: true });

      if (_this.props.onInputMouseEnter) {
        _this.props.onInputMouseEnter(e);
      }
    };

    this.handleMouseLeave = function (e) {
      _this.setState({ hover: false });

      if (_this.props.onInputMouseLeave) {
        _this.props.onInputMouseLeave(e);
      }
    };

    this.handleKeyDown = function (e) {
      var keyMap = {
        Escape: _this.handleEscapeKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      } else {
        _this.setState({
          popupShown: true
        });
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    this.handleEscapeKeyDown = function () {
      _this.setState({
        popupShown: false
      });
    };

    this.handleEnterKeyDown = function () {
      _this.setState({
        popupShown: false
      });
    };

    this.handleFocus = function (e) {
      if (_this.blurTimeout) {
        clearTimeout(_this.blurTimeout);
        _this.blurTimeout = null;
        return;
      }

      _this.setState({
        isActive: true,
        popupShown: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(e);
      }
    };

    this.handleBlur = function (e) {
      _this.blurTimeout = setTimeout(function () {
        _this.setState({
          isActive: false,
          popupShown: false
        });
        _this.blurTimeout = null;
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    };

    this.state = {
      isActive: props.isActive,
      popupShown: props.popupShown,
      hover: false
    };
  }

  _createClass(InputPopup, [{
    key: 'renderCaretSVG',
    value: function renderCaretSVG(popupShown) {
      return popupShown ? _react2['default'].createElement(
        'svg',
        { width: '10', height: '5', fill: 'currentColor' },
        _react2['default'].createElement('path', { d: 'M0 5 H10 L5 0 z' })
      ) : _react2['default'].createElement(
        'svg',
        { width: '10', height: '5', fill: 'currentColor' },
        _react2['default'].createElement('path', { d: 'M0 0 H10 L5 5 z' })
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.blurTimeout) {
        clearTimeout(this.blurTimeout);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.popupShown !== this.props.popupShown) {
        this.setState({ popupShown: nextProps.popupShown });
      }

      if (nextProps.isActive !== this.props.isActive) {
        this.setState({ isActive: nextProps.isActive });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isActive !== this.state.isActive && this.props.onIsActiveChange) {
        this.props.onIsActiveChange(this.state.isActive);
      }

      if (prevState.popupShown !== this.state.popupShown && this.props.onPopupShownChange) {
        this.props.onPopupShownChange(this.state.popupShown);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var onRenderCaret = _props.onRenderCaret;
      var onRenderPopup = _props.onRenderPopup;
      var inputPopupProps = _props.inputPopupProps;
      var classes = sheet.classes;
      var _state = this.state;
      var isActive = _state.isActive;
      var hover = _state.hover;
      var popupShown = _state.popupShown;

      var caret = this.renderCaretSVG(popupShown);
      var caretClassName = (0, _classnames2['default'])(classes.caret, (hover || isActive) && classes.caretActive);
      var popupClassName = (0, _classnames2['default'])(classes.popup, isActive && classes.popupActive);

      return _react2['default'].createElement(
        'div',
        _extends({ className: (0, _classnames2['default'])(classes.inputPopup, className),
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }, inputPopupProps),
        this.renderInput(),
        onRenderCaret(caretClassName, null, isActive, caret),
        onRenderPopup(popupClassName, null, isActive, popupShown)
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _props2 = this.props;
      var className = _props2.className;
      var onRenderCaret = _props2.onRenderCaret;
      var onRenderPopup = _props2.onRenderPopup;
      var inputPopupProps = _props2.inputPopupProps;
      var popup = _props2.popup;
      var inputClassName = _props2.inputClassName;
      var inputStyle = _props2.inputStyle;
      var children = _props2.children;
      var onInputFocus = _props2.onInputFocus;
      var onInputBlur = _props2.onInputBlur;
      var proxyProps = _props2.proxyProps;

      var props = _objectWithoutProperties(_props2, ['className', 'onRenderCaret', 'onRenderPopup', 'inputPopupProps', 'popup', 'inputClassName', 'inputStyle', 'children', 'onInputFocus', 'onInputBlur', 'proxyProps']);

      var classes = sheet.classes;

      var inputProps = _extends({}, props, {
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        className: (0, _classnames2['default'])(classes.input, inputClassName),
        onKeyDown: this.handleKeyDown,
        style: _extends({}, inputStyle, {
          paddingRight: '15px'
        })
      });

      if (typeof children === 'function') {
        return children(inputProps, proxyProps);
      } else {
        var input = _react.Children.only(children);

        return _react2['default'].cloneElement(input, _extends({}, inputProps, input.props));
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      onRenderCaret: _react.PropTypes.func,
      onRenderPopup: _react.PropTypes.func,
      onIsActiveChange: _react.PropTypes.func,
      onPopupShownChange: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onRenderCaret: function onRenderCaret(className, style, isActive, children) {
        return _react2['default'].createElement(
          'div',
          { className: className, style: style },
          children
        );
      },

      onRenderPopup: function onRenderPopup() {},

      inputPopupProps: {}
    },
    enumerable: true
  }]);

  return InputPopup;
})(_react.Component);

exports['default'] = InputPopup;

var sheet = jss.createStyleSheet({
  inputPopup: {
    position: 'relative',
    display: 'inline-block'
  },
  caret: {
    position: 'absolute',
    right: '5px',
    top: 0,
    'padding-top': '5px',
    'vertical-align': 'middle',
    'padding-left': '3px',
    width: '10px',
    '& svg': {
      display: 'inline-block',
      opacity: 0,
      transition: 'opacity 0.15s linear, transform 0.15s linear',
      transform: 'translateY(5px)'
    }
  },
  caretActive: {
    '& svg': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  popup: {
    position: 'absolute',
    left: 0,
    top: '100%',
    'z-index': 10000,
    'max-height': '30rem',
    'min-width': '22rem',
    'background-color': '#FFFFFF',
    'box-shadow': '1px 1px 4px rgba(100, 100, 100, 0.3)',
    display: 'flex',
    'flex-direction': 'column'
  }
}).attach();
module.exports = exports['default'];