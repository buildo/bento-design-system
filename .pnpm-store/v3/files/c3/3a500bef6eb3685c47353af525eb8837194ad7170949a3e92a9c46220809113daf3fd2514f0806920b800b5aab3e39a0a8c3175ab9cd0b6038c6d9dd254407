import { filterDOMProps } from "@react-aria/utils";
import _babelRuntimeHelpersEsmExtends from "@babel/runtime/helpers/esm/extends";

/**
 * Provides the accessibility implementation for a separator.
 * A separator is a visual divider between two groups of content,
 * e.g. groups of menu items or sections of a page.
 */
export function useSeparator(props) {
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
      separatorProps: _babelRuntimeHelpersEsmExtends({}, domProps, {
        role: 'separator',
        'aria-orientation': ariaOrientation
      })
    };
  }

  return {
    separatorProps: domProps
  };
}
//# sourceMappingURL=module.js.map
