'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var recipe$1 = require('@vanilla-extract/css/recipe');
var css = require('@vanilla-extract/css');
var createRuntimeFn_dist_vanillaExtractRecipesCreateRuntimeFn = require('../createRuntimeFn/dist/vanilla-extract-recipes-createRuntimeFn.cjs.prod.js');

function mapValues(input, fn) {
  var result = {};

  for (var _key in input) {
    result[_key] = fn(input[_key], _key);
  }

  return result;
}

function recipe(options, debugId) {
  var {
    variants = {},
    defaultVariants = {},
    compoundVariants = [],
    base = ''
  } = options;
  var defaultClassName = typeof base === 'string' ? base : css.style(base, debugId); // @ts-expect-error

  var variantClassNames = mapValues(variants, (variantGroup, variantGroupName) => css.styleVariants(variantGroup, styleRule => typeof styleRule === 'string' ? [styleRule] : styleRule, debugId ? "".concat(debugId, "_").concat(variantGroupName) : variantGroupName));
  var compounds = [];

  for (var {
    style: theStyle,
    variants: _variants
  } of compoundVariants) {
    compounds.push([_variants, typeof theStyle === 'string' ? theStyle : css.style(theStyle, "".concat(debugId, "_compound_").concat(compounds.length))]);
  }

  var config = {
    defaultClassName,
    variantClassNames,
    defaultVariants,
    compoundVariants: compounds
  };
  return recipe$1.addRecipe(createRuntimeFn_dist_vanillaExtractRecipesCreateRuntimeFn.createRuntimeFn(config), {
    importPath: '@vanilla-extract/recipes/createRuntimeFn',
    importName: 'createRuntimeFn',
    // @ts-expect-error
    args: [config]
  });
}

exports.recipe = recipe;
