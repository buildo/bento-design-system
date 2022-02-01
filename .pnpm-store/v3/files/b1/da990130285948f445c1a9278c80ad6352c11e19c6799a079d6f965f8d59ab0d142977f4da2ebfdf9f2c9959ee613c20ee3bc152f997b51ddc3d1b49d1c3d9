var _babelRuntimeHelpersExtends = $parcel$interopDefault(require("@babel/runtime/helpers/extends"));

var {
  usePress
} = require("@react-aria/interactions");

var {
  useFocusable
} = require("@react-aria/focus");

var {
  filterDOMProps,
  mergeProps,
  chain
} = require("@react-aria/utils");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

/**
 * Provides the behavior and accessibility implementation for a button component. Handles mouse, keyboard, and touch interactions,
 * focus behavior, and ARIA props for both native button elements and custom element types.
 * @param props - Props to be applied to the button.
 * @param ref - A ref to a DOM element for the button.
 */
function useButton(props, ref) {
  let {
    elementType = 'button',
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    // @ts-ignore - undocumented
    preventFocusOnPress,
    // @ts-ignore
    onClick: deprecatedOnClick,
    href,
    target,
    rel,
    type = 'button'
  } = props;
  let additionalProps;

  if (elementType === 'button') {
    additionalProps = {
      type,
      disabled: isDisabled
    };
  } else {
    additionalProps = {
      role: 'button',
      tabIndex: isDisabled ? undefined : 0,
      href: elementType === 'a' && isDisabled ? undefined : href,
      target: elementType === 'a' ? target : undefined,
      type: elementType === 'input' ? type : undefined,
      disabled: elementType === 'input' ? isDisabled : undefined,
      'aria-disabled': !isDisabled || elementType === 'input' ? undefined : isDisabled,
      rel: elementType === 'a' ? rel : undefined
    };
  }

  let {
    pressProps,
    isPressed
  } = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    isDisabled,
    preventFocusOnPress,
    ref
  });
  let {
    focusableProps
  } = useFocusable(props, ref);
  let buttonProps = mergeProps(focusableProps, pressProps);
  buttonProps = mergeProps(buttonProps, filterDOMProps(props, {
    labelable: true
  }));
  return {
    isPressed,
    // Used to indicate press state for visual
    buttonProps: mergeProps(additionalProps, buttonProps, {
      'aria-haspopup': props['aria-haspopup'],
      'aria-expanded': props['aria-expanded'],
      'aria-controls': props['aria-controls'],
      'aria-pressed': props['aria-pressed'],
      onClick: e => {
        if (deprecatedOnClick) {
          deprecatedOnClick(e);
          console.warn('onClick is deprecated, please use onPress');
        }
      }
    })
  };
}

exports.useButton = useButton;

/**
 * Provides the behavior and accessibility implementation for a toggle button component.
 * ToggleButtons allow users to toggle a selection on or off, for example switching between two states or modes.
 */
function useToggleButton(props, state, ref) {
  const {
    isSelected
  } = state;
  const {
    isPressed,
    buttonProps
  } = useButton(_babelRuntimeHelpersExtends({}, props, {
    onPress: chain(state.toggle, props.onPress)
  }), ref);
  return {
    isPressed,
    buttonProps: mergeProps(buttonProps, {
      'aria-pressed': isSelected
    })
  };
}

exports.useToggleButton = useToggleButton;
//# sourceMappingURL=main.js.map
