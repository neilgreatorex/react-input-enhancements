'use strict';

var _reactTransformHmr2 = require('react-transform-hmr');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

var _react = require('react');

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react2 = _interopRequireDefault(_react);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _shapes = require('./shapes');

var shapes = _interopRequireWildcard(_shapes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jss = require('jss');

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _utilsFindMatchingTextIndex = require('./utils/findMatchingTextIndex');

var _utilsFindMatchingTextIndex2 = _interopRequireDefault(_utilsFindMatchingTextIndex);

var _filters = require('./filters');

var filters = _interopRequireWildcard(_filters);

var _InputPopup = require('./InputPopup');

var _InputPopup2 = _interopRequireDefault(_InputPopup);

var _utilsGetOptionText = require('./utils/getOptionText');

var _utilsGetOptionText2 = _interopRequireDefault(_utilsGetOptionText);

var _utilsGetOptionLabel = require('./utils/getOptionLabel');

var _utilsGetOptionLabel2 = _interopRequireDefault(_utilsGetOptionLabel);

var _utilsGetOptionValue = require('./utils/getOptionValue');

var _utilsGetOptionValue2 = _interopRequireDefault(_utilsGetOptionValue);

var _utilsIsStatic = require('./utils/isStatic');

var _utilsIsStatic2 = _interopRequireDefault(_utilsIsStatic);

var _DropdownOption = require('./DropdownOption');

var _DropdownOption2 = _interopRequireDefault(_DropdownOption);

var _components = {
  _$Dropdown: {
    displayName: 'Dropdown'
  }
};

var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
  filename: 'src/Dropdown.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var jss = (0, _jss.create)();
jss.use((0, _jssNested2['default'])());
jss.use((0, _jssVendorPrefixer2['default'])());

function getOptionClassName(opt, isHighlighted, isDisabled) {
  return (0, _classnames2['default'])(sheet.classes.option, isHighlighted && sheet.classes.optionHighlighted, isDisabled && sheet.classes.optionDisabled);
}

function getOptionKey(opt, idx) {
  var value = (0, _utilsGetOptionValue2['default'])(opt);

  return opt === null ? 'option-separator-' + idx : 'option-' + (typeof value === 'string' ? value : (0, _utilsGetOptionText2['default'])(opt) + idx);
}

function getSiblingIndex(idx, options, next) {
  if (idx === null) {
    idx = next ? -1 : options.length;
  }

  var step = next ? 1 : -1;

  for (var i = 0; i < options.length; i++) {
    var currentIdx = (idx + (i + 1) * step + options.length) % options.length;
    if (options[currentIdx] !== null && !options[currentIdx].disabled) {
      return currentIdx;
    }
  }

  return idx;
}

function getShownOptions(value, options, optionFilters) {
  return optionFilters.reduce(function (o, filter) {
    return filter(o, value);
  }, options);
}

function findOptionIndex(options, option) {
  return options.findIndex(function (opt) {
    return opt === option;
  });
}

function getStateFromProps(props) {
  var match = (0, _utilsFindMatchingTextIndex2['default'])(props.value || props.defaultValue, props.options);

  var _match = _slicedToArray(match, 2);

  var selectedIndex = _match[0];
  var matchingText = _match[1];

  var shownOptions = getShownOptions(matchingText, props.options, props.optionFilters);
  var highlightedIndex = findOptionIndex(shownOptions, props.options[selectedIndex]);

  return {
    value: matchingText || null,
    isActive: false,
    listShown: false,
    selectedIndex: selectedIndex,
    highlightedIndex: highlightedIndex,
    shownOptions: shownOptions
  };
}

var Dropdown = (function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this = this;

    _classCallCheck(this, _Dropdown);

    _get(Object.getPrototypeOf(_Dropdown.prototype), 'constructor', this).call(this, props);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this.renderPopup = function (popupClassName, popupStyle, isActive, popupShown) {
      var _props = _this.props;
      var onRenderList = _props.onRenderList;
      var onRenderListHeader = _props.onRenderListHeader;
      var options = _props.options;
      var shownOptions = _this.state.shownOptions;

      return onRenderList(popupClassName, popupStyle, isActive, popupShown, shownOptions.map(_this.renderOption), onRenderListHeader(options.length, shownOptions.length, shownOptions.filter(_utilsIsStatic2['default']).length));
    };

    this.renderOption = function (opt, idx) {
      var onRenderOption = _this.props.onRenderOption;

      var highlighted = idx === _this.state.highlightedIndex;
      var disabled = opt && opt.disabled;

      return _react2['default'].createElement(
        _DropdownOption2['default'],
        { key: getOptionKey(opt, idx),
          onMouseDown: _this.handleOptionClick.bind(_this, idx),
          highlighted: highlighted },
        onRenderOption(getOptionClassName(opt, highlighted, disabled), null, opt, highlighted)
      );
    };

    this.handleChange = function (e) {
      var _props2 = _this.props;
      var options = _props2.options;
      var optionFilters = _props2.optionFilters;

      var value = e.target.value;

      _this.setState({ value: value });
      _this.updateHighlightedIndex(value, options, optionFilters);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    this.handleKeyDown = function (e) {
      var keyMap = {
        ArrowUp: _this.handleArrowUpKeyDown,
        ArrowDown: _this.handleArrowDownKeyDown,
        Enter: _this.handleEnterKeyDown
      };

      if (keyMap[e.key]) {
        keyMap[e.key](e);
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    };

    this.handleArrowUpKeyDown = function (e) {
      var _state = _this.state;
      var highlightedIndex = _state.highlightedIndex;
      var shownOptions = _state.shownOptions;

      e.preventDefault();

      _this.setState({
        highlightedIndex: getSiblingIndex(highlightedIndex, shownOptions, false)
      });
    };

    this.handleArrowDownKeyDown = function (e) {
      var _state2 = _this.state;
      var highlightedIndex = _state2.highlightedIndex;
      var shownOptions = _state2.shownOptions;

      e.preventDefault();

      _this.setState({
        highlightedIndex: getSiblingIndex(highlightedIndex, shownOptions, true)
      });
    };

    this.handleEnterKeyDown = function () {
      var _state3 = _this.state;
      var highlightedIndex = _state3.highlightedIndex;
      var shownOptions = _state3.shownOptions;

      var option = shownOptions[highlightedIndex];

      setTimeout(function () {
        _this.selectOption(findOptionIndex(_this.props.options, option), true);
      });
    };

    this.handleIsActiveChange = function (isActive) {
      _this.setState({ isActive: isActive });
    };

    this.handlePopupShownChange = function (popupShown) {
      _this.setState({ listShown: popupShown });
    };

    this.state = getStateFromProps(props);
  }

  _createClass(Dropdown, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var options = nextProps.options;
      var optionFilters = nextProps.optionFilters;

      if ((nextProps.defaultValue || nextProps.value) && nextState.value === null || this.props.value !== nextProps.value) {
        var state = getStateFromProps(nextProps);

        if (state.value !== this.state.value) {
          this.setState(state);
        }
      } else if (this.props.options !== options || this.props.optionFilters !== optionFilters) {
        var _updateHighlightedIndex = this.updateHighlightedIndex(nextState.value, options, optionFilters);

        var _updateHighlightedIndex2 = _slicedToArray(_updateHighlightedIndex, 2);

        var highlightedIndex = _updateHighlightedIndex2[0];
        var shownOptions = _updateHighlightedIndex2[1];

        var selectedIndex = findOptionIndex(options, shownOptions[highlightedIndex]);

        this.setState({ selectedIndex: selectedIndex });
      } else if (!this.props.allowFreeText && this.state.isActive && !nextState.isActive) {
        this.setState({ value: (0, _utilsGetOptionText2['default'])(nextProps.options[nextState.selectedIndex]) });
      }
    }
  }, {
    key: 'updateHighlightedIndex',
    value: function updateHighlightedIndex(value, options, optionFilters) {
      var shownOptions = getShownOptions(value, options, optionFilters);
      var match = (0, _utilsFindMatchingTextIndex2['default'])(value, shownOptions, true);

      var _match2 = _slicedToArray(match, 1);

      var highlightedIndex = _match2[0];

      this.setState({ highlightedIndex: highlightedIndex, shownOptions: shownOptions });

      return [highlightedIndex, shownOptions];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var onRenderList = _props3.onRenderList;
      var dropdownProps = _props3.dropdownProps;
      var style = _props3.style;
      var children = _props3.children;
      var onValueChange = _props3.onValueChange;

      var props = _objectWithoutProperties(_props3, ['onRenderList', 'dropdownProps', 'style', 'children', 'onValueChange']);

      var value = this.state.value === null ? '' : this.state.value;

      return _react2['default'].createElement(
        _InputPopup2['default'],
        _extends({}, props, {
          value: value,
          proxyProps: { textValue: value },
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          inputPopupProps: dropdownProps,
          onRenderPopup: this.renderPopup,
          onIsActiveChange: this.handleIsActiveChange,
          onPopupShownChange: this.handlePopupShownChange,
          popupShown: this.state.listShown,
          isActive: this.state.isActive }),
        children
      );
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(idx) {
      var _this2 = this;

      var option = this.state.shownOptions[idx];
      this.setState({
        listShown: false
      }, function () {
        _this2.selectOption(findOptionIndex(_this2.props.options, option), true);
      });
    }
  }, {
    key: 'selectOption',
    value: function selectOption(index, fireOnChange) {
      var _props4 = this.props;
      var options = _props4.options;
      var optionFilters = _props4.optionFilters;

      var option = options[index];
      var shownOptions = getShownOptions((0, _utilsGetOptionText2['default'])(option), options, optionFilters);

      this.setState({
        value: (0, _utilsGetOptionText2['default'])(option),
        highlightedIndex: findOptionIndex(shownOptions, option),
        selectedIndex: index,
        isActive: false,
        shownOptions: shownOptions
      });
      if (fireOnChange && this.props.onValueChange) {
        this.props.onValueChange((0, _utilsGetOptionValue2['default'])(option), (0, _utilsGetOptionText2['default'])(option));
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      value: _react.PropTypes.string,
      options: _react.PropTypes.arrayOf(shapes.ITEM_OR_STRING),
      allowFreeText: _react.PropTypes.bool,
      onRenderOption: _react.PropTypes.func,
      onRenderList: _react.PropTypes.func,
      optionFilters: _react.PropTypes.arrayOf(_react.PropTypes.func)
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      allowFreeText: false,

      onRenderOption: function onRenderOption(className, style, opt, highlighted) {
        return opt !== null ? _react2['default'].createElement(
          'div',
          { className: className, style: style },
          (0, _utilsGetOptionLabel2['default'])(opt, highlighted)
        ) : _react2['default'].createElement('div', { className: sheet.classes.separator });
      },

      onRenderList: function onRenderList(className, style, isActive, listShown, children, header) {
        return listShown && _react2['default'].createElement(
          'div',
          { className: className, style: style },
          header && _react2['default'].createElement(
            'div',
            { className: sheet.classes.listHeader },
            header
          ),
          _react2['default'].createElement(
            'div',
            { className: sheet.classes.listOptions },
            children
          )
        );
      },

      onRenderListHeader: function onRenderListHeader(allCount, shownCount, staticCount) {
        if (allCount - staticCount < 20) return null;
        var allItems = allCount - staticCount + ' ' + (allCount - staticCount === 1 ? 'item' : 'items');
        return allCount === shownCount ? allItems + ' found' : shownCount - staticCount + ' of ' + allItems + ' shown';
      },

      dropdownProps: {},

      optionFilters: [filters.filterByMatchingTextWithThreshold(20), filters.sortByMatchingText, filters.limitBy(100), filters.notFoundMessage('No matches found'), filters.filterRedudantSeparators]
    },
    enumerable: true
  }]);

  var _Dropdown = Dropdown;
  Dropdown = _wrapComponent('_$Dropdown')(Dropdown) || Dropdown;
  return Dropdown;
})(_react.Component);

exports['default'] = Dropdown;

var sheet = jss.createStyleSheet({
  listHeader: {
    'flex-shrink': 0,
    height: '3rem',
    'font-size': '0.8em',
    color: '#999999',
    'background-color': '#FAFAFA',
    padding: '0.5rem 1rem',
    'border-bottom': '1px solid #DDDDDD'
  },
  listOptions: {
    'flex-grow': 1,
    'overflow-y': 'auto'
  },
  option: {
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    '&:hover': {
      'background-color': '#F0F0F0'
    }
  },
  optionHighlighted: {
    'background-color': '#3333FF',
    color: '#FFFFFF',
    '&:hover': {
      'background-color': '#3333FF'
    }
  },
  optionDisabled: {
    color: '#999999',
    '&:hover': {
      'background-color': 'inherit'
    }
  },
  separator: {
    margin: '0.5rem 0',
    width: '100%',
    height: '1px',
    'border-top': '1px solid #DDDDDD'
  }
}).attach();
module.exports = exports['default'];