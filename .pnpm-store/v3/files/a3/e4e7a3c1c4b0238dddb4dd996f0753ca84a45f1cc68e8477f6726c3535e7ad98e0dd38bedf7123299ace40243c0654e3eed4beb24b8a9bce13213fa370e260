'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var shouldApplyCompound = (compoundCheck, selections) => {
  for (var key of Object.keys(compoundCheck)) {
    if (compoundCheck[key] !== selections[key]) {
      return false;
    }
  }

  return true;
};

var createRuntimeFn = config => options => {
  var className = config.defaultClassName;

  var selections = _objectSpread2(_objectSpread2({}, config.defaultVariants), options);

  for (var variantName in selections) {
    var _selections$variantNa;

    var variantSelection = (_selections$variantNa = selections[variantName]) !== null && _selections$variantNa !== void 0 ? _selections$variantNa : config.defaultVariants[variantName];

    if (variantSelection != null) {
      var selection = variantSelection;

      if (typeof selection === 'boolean') {
        // @ts-expect-error
        selection = selection === true ? 'true' : 'false';
      } // @ts-expect-error


      className += ' ' + config.variantClassNames[variantName][selection];
    }
  }

  for (var [compoundCheck, compoundClassName] of config.compoundVariants) {
    if (shouldApplyCompound(compoundCheck, selections)) {
      className += ' ' + compoundClassName;
    }
  }

  return className;
};

exports.createRuntimeFn = createRuntimeFn;
