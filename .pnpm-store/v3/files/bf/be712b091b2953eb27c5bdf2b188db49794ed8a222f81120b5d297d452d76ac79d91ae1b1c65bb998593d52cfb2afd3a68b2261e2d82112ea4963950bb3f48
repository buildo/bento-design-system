import { addRecipe } from '@vanilla-extract/css/recipe';
import { style, styleVariants } from '@vanilla-extract/css';
import { createRuntimeFn } from '../createRuntimeFn/dist/vanilla-extract-recipes-createRuntimeFn.esm.js';

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
  var defaultClassName = typeof base === 'string' ? base : style(base, debugId); // @ts-expect-error

  var variantClassNames = mapValues(variants, (variantGroup, variantGroupName) => styleVariants(variantGroup, styleRule => typeof styleRule === 'string' ? [styleRule] : styleRule, debugId ? "".concat(debugId, "_").concat(variantGroupName) : variantGroupName));
  var compounds = [];

  for (var {
    style: theStyle,
    variants: _variants
  } of compoundVariants) {
    compounds.push([_variants, typeof theStyle === 'string' ? theStyle : style(theStyle, "".concat(debugId, "_compound_").concat(compounds.length))]);
  }

  var config = {
    defaultClassName,
    variantClassNames,
    defaultVariants,
    compoundVariants: compounds
  };
  return addRecipe(createRuntimeFn(config), {
    importPath: '@vanilla-extract/recipes/createRuntimeFn',
    importName: 'createRuntimeFn',
    // @ts-expect-error
    args: [config]
  });
}

export { recipe };
