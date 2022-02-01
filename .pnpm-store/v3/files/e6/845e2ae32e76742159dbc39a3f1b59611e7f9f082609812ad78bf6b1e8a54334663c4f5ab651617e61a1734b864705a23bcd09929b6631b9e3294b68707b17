var {
  filterDOMProps
} = require("@react-aria/utils");

var _babelRuntimeHelpersExtends = $parcel$interopDefault(require("@babel/runtime/helpers/extends"));

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

/**
 * Provides the accessibility implementation for a separator.
 * A separator is a visual divider between two groups of content,
 * e.g. groups of menu items or sections of a page.
 */
function useSeparator(props) {
  let domProps = filterDOMProps(props, {
    labelable: true
  });
  let ariaOrientation; // if orientation is horizontal, aria-orientation default is horizontal, so we leave it undefined
  // if it's vertical, we need to specify it

  if (props.orientation === 'vertical') {
    ariaOrientation = 'vertical';
  } // hr elements implicitly have role = separator and a horizontal orientation


  if (props.elementType !== 'hr') {
    return {
      separatorProps: _babelRuntimeHelpersExtends({}, domProps, {
        role: 'separator',
        'aria-orientation': ariaOrientation
      })
    };
  }

  return {
    separatorProps: domProps
  };
}

exports.useSeparator = useSeparator;
//# sourceMappingURL=main.js.map
