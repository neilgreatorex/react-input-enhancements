'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = applyMaskToString;

function applyMaskToString(string, pattern, emptyChar) {
  var result = '';
  var stringIndex = 0;
  var lastIndex = 0;

  string = string.replace(new RegExp(emptyChar, 'g'), '');
  for (var i = 0; i < pattern.length; i++) {
    var patternChar = pattern[i];
    if (patternChar === '\\') {
      string = string.replace(pattern[++i], '');
    } else if (patternChar !== '0' && patternChar !== 'a') {
      string = string.replace(patternChar, '');
    }
  }

  for (var i = 0; i < pattern.length; i++) {
    var patternChar = pattern[i];
    var stringChar = stringIndex < string.length ? string[stringIndex] : emptyChar;
    if (stringIndex < string.length) {
      lastIndex = result.length + 1;
    }

    switch (patternChar) {
      case 'a':
        if (!/^[a-zA-Z]$/.test(stringChar) && stringChar !== emptyChar) {
          return {
            result: result,
            unmaskedValue: string,
            isValid: false
          };
        }
        result += stringChar;
        stringIndex++;
        break;

      case '0':
        if (!/^[0-9]$/.test(stringChar) && stringChar !== emptyChar) {
          return {
            result: result,
            unmaskedValue: string,
            isValid: false
          };
        }
        result += stringChar;
        stringIndex++;
        break;

      case '\\':
        if (++i < pattern.length) {
          result += pattern[i];
          if (stringChar === pattern[i]) {
            stringIndex++;
          }
        }
        break;

      default:
        result += pattern[i];
        if (stringChar === pattern[i]) {
          stringIndex++;
        }
        break;
    }
  }

  return {
    result: result,
    unmaskedValue: string,
    isValid: stringIndex >= string.length,
    lastIndex: lastIndex
  };
}

module.exports = exports['default'];