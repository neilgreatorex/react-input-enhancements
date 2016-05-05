'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _Mask = require('./Mask');

var _Mask2 = _interopRequireDefault(_Mask);

var _InputPopup = require('./InputPopup');

var _InputPopup2 = _interopRequireDefault(_InputPopup);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _jss = require('jss');

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var jss = (0, _jss.create)();
jss.use((0, _jssNested2['default'])());
jss.use((0, _jssVendorPrefixer2['default'])());

var VALIDATORS = {
  YYYY: function YYYY() {
    return false;
  },
  MM: function MM(val) {
    return parseInt(val, 10) > 12 ? '12' : false;
  },
  ddd: function ddd() {},
  DD: function DD(val) {
    return parseInt(val, 10) > 31 ? '31' : false;
  }
};

function getStateFromProps(value, props) {
  var date = (0, _moment2['default'])(value === null ? undefined : value, props.pattern, props.locale);

  return {
    date: date,
    value: value,
    pattern: props.pattern.replace(/ddd/g, '\\d\\d\\d').replace(/[DMY]/g, '0')
  };
}

var DatePicker = (function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this = this;

    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.handlePopupShownChange = function (popupShown) {
      _this.setState({ popupShown: popupShown });
    };

    this.handleIsActiveChange = function (isActive) {
      _this.setState({ isActive: isActive });
    };

    this.handleChange = function (e) {
      _this.setState(getStateFromProps(e.target.value, _this.props));

      if (_this.props.onInputChange) {
        _this.props.onInputChange(e);
      }
    };

    this.handleValuePreUpdate = function (value) {
      var localeData = _moment2['default'].localeData(_this.props.locale);
      var days = localeData._weekdaysShort;

      return value.replace(RegExp('(' + days.join('|').replace('.', '\\.') + ')', 'g'), 'ddd');
    };

    this.handleValueUpdate = function (value) {
      var localeData = _moment2['default'].localeData(_this.props.locale);
      var state = getStateFromProps(value.replace(/ddd/g, localeData.weekdaysShort(_this.state.date)), _this.props);

      return value.replace(/ddd/g, localeData.weekdaysShort(state.date));
    };

    this.renderPopup = function (popupClassName, popupStyle, isActive, popupShown) {
      var _props = _this.props;
      var onRenderCalendar = _props.onRenderCalendar;
      var locale = _props.locale;

      return onRenderCalendar(popupClassName, popupStyle, _this.state.date, isActive, popupShown, _this.handleSelect, locale);
    };

    this.handleSelect = function (date) {
      var localeMoment = (0, _moment2['default'])(date);
      localeMoment.locale(_this.props.locale);
      var value = localeMoment.format(_this.props.pattern);
      _this.setState(_extends({
        popupShown: false,
        isActive: false
      }, getStateFromProps(value, _this.props)));
      _this.props.onChange && _this.props.onChange(date);
    };

    this.handleValidate = function (value, processedValue) {
      var _props2 = _this.props;
      var pattern = _props2.pattern;
      var emptyChar = _props2.emptyChar;

      var re = RegExp(emptyChar, 'g');
      var result = processedValue.result;

      _Object$keys(VALIDATORS).forEach(function (format) {
        var pos = pattern.indexOf(format);
        if (pos !== -1) {
          var val = processedValue.result.substr(pos, format.length).replace(re, '');
          val = VALIDATORS[format](val);
          if (val) {
            result = result.substr(0, pos) + val + result.substr(pos + val.length);
          }
        }
      });

      return _extends({}, processedValue, {
        result: _this.handleValueUpdate(result)
      });
    };

    this.state = getStateFromProps(props.value, props);
  }

  _createClass(DatePicker, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var value = nextProps.value !== this.props.value ? nextProps.value : nextState.value;
      var state = getStateFromProps(value, nextProps);

      if (state.value !== nextState.value) {
        this.setState(getStateFromProps(value, nextProps));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var pattern = _props3.pattern;
      var children = _props3.children;
      var value = _props3.value;
      var defaultValue = _props3.defaultValue;
      var onChange = _props3.onChange;
      var placeholder = _props3.placeholder;

      var props = _objectWithoutProperties(_props3, ['pattern', 'children', 'value', 'defaultValue', 'onChange', 'placeholder']);

      return _react2['default'].createElement(
        _Mask2['default'],
        { pattern: this.state.pattern,
          value: this.state.value,
          defaultValue: defaultValue,
          onValidate: this.handleValidate,
          onChange: this.handleChange,
          placeholder: placeholder,
          onValuePreUpdate: this.handleValuePreUpdate },
        _react2['default'].createElement(
          _InputPopup2['default'],
          _extends({}, props, {
            onRenderPopup: this.renderPopup,
            onPopupShownChange: this.handlePopupShownChange,
            onIsActiveChange: this.handleIsActiveChange,
            popupShown: this.state.popupShown,
            isActive: this.state.isActive }),
          children
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {},
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      pattern: 'ddd DD/MM/YYYY',
      placeholder: (0, _moment2['default'])().format('ddd DD/MM/YYYY'),
      onRenderCalendar: function onRenderCalendar(className, style, date, isActive, popupShown, onSelect, locale) {
        return popupShown && _react2['default'].createElement(
          'div',
          { className: className, style: style },
          _react2['default'].createElement(_reactDatePicker2['default'], { date: date.format('YYYY-MM-DD'),
            className: sheet.classes.datePicker,
            onChange: function (date) {
              return onSelect((0, _moment2['default'])(date, 'YYYY-MM-DD', locale));
            },
            locale: locale })
        );
      },
      locale: 'en'
    },
    enumerable: true
  }]);

  return DatePicker;
})(_react.Component);

exports['default'] = DatePicker;

var sheet = jss.createStyleSheet({
  datePicker: {
    display: 'flex',
    'flex-direction': 'column',
    flex: '1 0 auto',
    'box-sizing': 'border-box',
    width: '28rem',
    height: '30rem',

    '& *': {
      'box-sizing': 'border-box',
      'user-select': 'none',
      outline: 'none'
    },

    '& .dp-header': {
      background: '#f0f0f0',
      'border-bottom': '1px solid #CCCCCC',
      '& .dp-cell': {
        padding: '0.5rem',
        color: '#000'
      }
    },

    '& .dp-footer': {
      display: 'flex',
      'flex-direction': 'row',
      'justify-content': 'space-around',
      padding: '0.5rem'
    },

    '& .dp-footer-today, & .dp-footer-selected': {
      padding: '0.5rem 1rem',
      'border-radius': '2rem',
      cursor: 'pointer'
    },

    '& .dp-footer-today:hover, & .dp-footer-selected:hover': {
      'background-color': '#F0F0F0'
    },

    '& .dp-body': {
      display: 'flex',
      'flex-direction': 'column',
      flex: 1
    },

    '& .dp-week-day-names': {
      color: '#000'
    },

    '& .dp-prev, & .dp-next': {
      color: '#AAA'
    },

    '& .dp-table': {
      width: '100%',
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
      flex: 1
    },

    '& .dp-row': {
      display: 'flex',
      'flex-direction': 'row',
      flex: 1
    },

    '& .dp-cell': {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      flex: 1,
      padding: '0.5rem'
    },

    '& .dp-day': {
      position: 'relative',
      cursor: 'pointer',

      '&:before': {
        content: '""',
        position: 'absolute',
        'z-index': '-1',
        width: '3.1rem',
        height: '3.1rem',
        'border-radius': '2rem',
        left: '0.5rem',
        top: '0.1rem'
      }
    },

    '& .dp-day:hover:before': {
      'background-color': '#F0F0F0'
    },

    '& .dp-value': {
      color: '#FFF',
      '&:before': {
        'background-color': '#2196f3'
      },
      '&:hover:before': {
        'background-color': '#0A6EBD'
      }
    },

    '& .dp-month.dp-value': {
      'background-color': '#2196f3',
      '&:hover': {
        'background-color': '#0A6EBD'
      }
    },

    '& .dp-year.dp-value': {
      'background-color': '#2196f3',
      '&:hover': {
        'background-color': '#0A6EBD'
      }
    },

    '& .dp-current': {
      '&:before': {
        'box-shadow': '0 0 0 1px #FFF, 0 0 0 2px #2196f3'
      }
    },

    '& .dp-nav-table': {
      width: '100%',
      display: 'flex',
      'flex-direction': 'row',
      flex: 1,

      '& .dp-cell': {
        flex: 7,
        cursor: 'pointer',
        '&:hover': {
          'background-color': '#E0E0E0'
        }
      },

      '& .dp-nav-cell': {
        flex: 1
      }
    },

    '& .dp-month, & .dp-year': {
      cursor: 'pointer',
      'border-radius': '0.5rem'
    },

    '& .dp-month:hover, & .dp-year:hover': {
      'background-color': '#F0F0F0'
    }
  }
}).attach();
module.exports = exports['default'];