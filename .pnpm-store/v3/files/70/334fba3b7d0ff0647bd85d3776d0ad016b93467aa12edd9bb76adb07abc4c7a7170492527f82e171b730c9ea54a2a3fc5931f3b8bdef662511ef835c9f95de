'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var recipe = require('@vanilla-extract/css/recipe');

function createNormalizeValueFn(properties) {
  var {
    conditions
  } = properties;

  if (!conditions) {
    throw new Error('Styles have no conditions');
  }

  function normalizeValue(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!conditions.defaultCondition) {
        throw new Error('No default condition');
      }

      return {
        [conditions.defaultCondition]: value
      };
    }

    if (Array.isArray(value)) {
      if (!('responsiveArray' in conditions)) {
        throw new Error('Responsive arrays are not supported');
      }

      var returnValue = {};

      for (var index in conditions.responsiveArray) {
        if (value[index] != null) {
          returnValue[conditions.responsiveArray[index]] = value[index];
        }
      }

      return returnValue;
    }

    return value;
  }

  return recipe.addRecipe(normalizeValue, {
    importPath: '@vanilla-extract/sprinkles/createUtils',
    importName: 'createNormalizeValueFn',
    args: [{
      conditions: properties.conditions
    }]
  });
}
function createMapValueFn(properties) {
  var {
    conditions
  } = properties;

  if (!conditions) {
    throw new Error('Styles have no conditions');
  }

  var normalizeValue = createNormalizeValueFn(properties);

  function mapValue(value, mapFn) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!conditions.defaultCondition) {
        throw new Error('No default condition');
      }

      return mapFn(value, conditions.defaultCondition);
    }

    var normalizedObject = Array.isArray(value) ? normalizeValue(value) : value;
    var mappedObject = {};

    for (var _key in normalizedObject) {
      if (normalizedObject[_key] != null) {
        mappedObject[_key] = mapFn(normalizedObject[_key], _key);
      }
    }

    return mappedObject;
  }

  return recipe.addRecipe(mapValue, {
    importPath: '@vanilla-extract/sprinkles/createUtils',
    importName: 'createMapValueFn',
    args: [{
      conditions: properties.conditions
    }]
  });
}

exports.createMapValueFn = createMapValueFn;
exports.createNormalizeValueFn = createNormalizeValueFn;
