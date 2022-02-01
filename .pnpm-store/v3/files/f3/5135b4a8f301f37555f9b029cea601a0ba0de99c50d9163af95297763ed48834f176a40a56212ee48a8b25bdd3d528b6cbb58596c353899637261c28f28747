'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var css = require('@vanilla-extract/css');
var recipe = require('@vanilla-extract/css/recipe');
var fileScope = require('@vanilla-extract/css/fileScope');
var createSprinkles$1 = require('./createSprinkles-41696ec2.cjs.prod.js');
var createUtils_dist_vanillaExtractSprinklesCreateUtils = require('../createUtils/dist/vanilla-extract-sprinkles-createUtils.cjs.prod.js');

function defineProperties(options) {
  var styles = 'shorthands' in options ? Object.fromEntries(Object.entries(options.shorthands).map(_ref => {
    var [prop, mappings] = _ref;
    return [prop, {
      mappings
    }];
  })) : {};

  var _loop = function _loop(key) {
    var property = options.properties[key];
    styles[key] = {
      values: {}
    };

    if ('responsiveArray' in options) {
      styles[key].responsiveArray = options.responsiveArray;
    }

    var processValue = (valueName, value) => {
      if ('conditions' in options) {
        styles[key].values[valueName] = {
          conditions: {}
        };
        var defaultConditions = options.defaultCondition ? Array.isArray(options.defaultCondition) ? options.defaultCondition : [options.defaultCondition] : [];
        var defaultClasses = [];

        for (var _conditionName in options.conditions) {
          var styleValue = typeof value === 'object' ? value : {
            [key]: value
          };
          var condition = options.conditions[_conditionName];

          if (condition['@supports']) {
            styleValue = {
              '@supports': {
                [condition['@supports']]: styleValue
              }
            };
          }

          if (condition['@media']) {
            styleValue = {
              '@media': {
                [condition['@media']]: styleValue
              }
            };
          }

          if (condition.selector) {
            styleValue = {
              selectors: {
                [condition.selector]: styleValue
              }
            };
          }

          var className = css.style(styleValue, "".concat(key, "_").concat(String(valueName), "_").concat(_conditionName));
          styles[key].values[valueName].conditions[_conditionName] = className;

          if (defaultConditions.indexOf(_conditionName) > -1) {
            defaultClasses.push(className);
          }
        }

        if (defaultClasses.length > 0) {
          styles[key].values[valueName].defaultClass = defaultClasses.join(' ');
        }
      } else {
        var _styleValue = typeof value === 'object' ? value : {
          [key]: value
        };

        styles[key].values[valueName] = {
          defaultClass: css.style(_styleValue, "".concat(key, "_").concat(String(valueName)))
        };
      }
    };

    if (Array.isArray(property)) {
      for (var value of property) {
        processValue(value, value);
      }
    } else {
      for (var valueName in property) {
        var _value = property[valueName];
        processValue(valueName, _value);
      }
    }
  };

  for (var key in options.properties) {
    _loop(key);
  }

  var conditions = 'conditions' in options ? {
    defaultCondition: options.defaultCondition,
    conditionNames: Object.keys(options.conditions),
    responsiveArray: options.responsiveArray
  } : undefined;
  return {
    conditions,
    styles
  };
}

var mockComposeStyles = classList => classList;

function createSprinkles() {
  for (var _len = arguments.length, config = new Array(_len), _key = 0; _key < _len; _key++) {
    config[_key] = arguments[_key];
  }

  // When using Sprinkles with the runtime (e.g. within a jest test)
  // `style` can be called (only for composition) outside of a fileScope.
  // Checking we're within a fileScope ensures this doesn't blow up and is
  // safe as compositions don't make sense at runtime
  var sprinkles = createSprinkles$1.createSprinkles(fileScope.hasFileScope() ? css.composeStyles : mockComposeStyles)(...config);
  return recipe.addRecipe(sprinkles, {
    importPath: '@vanilla-extract/sprinkles/createRuntimeSprinkles',
    importName: 'createSprinkles',
    args: config
  });
}
/** @deprecated - Use `defineProperties` */

var createAtomicStyles = defineProperties;
/** @deprecated - Use `createSprinkles` */

var createAtomsFn = createSprinkles;

exports.createMapValueFn = createUtils_dist_vanillaExtractSprinklesCreateUtils.createMapValueFn;
exports.createNormalizeValueFn = createUtils_dist_vanillaExtractSprinklesCreateUtils.createNormalizeValueFn;
exports.createAtomicStyles = createAtomicStyles;
exports.createAtomsFn = createAtomsFn;
exports.createSprinkles = createSprinkles;
exports.defineProperties = defineProperties;
