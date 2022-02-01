var _react2 = require("react");

var _react = $parcel$interopDefault(_react2);

var {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} = _react2;

var {
  mergeProps,
  isIOS,
  runAfterTransition,
  focusWithoutScrolling,
  useGlobalListeners,
  useSyncRef,
  isMac,
  useEvent,
  useDescription
} = require("@react-aria/utils");

var _babelRuntimeHelpersObjectWithoutPropertiesLoose = $parcel$interopDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _babelRuntimeHelpersExtends = $parcel$interopDefault(require("@babel/runtime/helpers/extends"));

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

// Note that state only matters here for iOS. Non-iOS gets user-select: none applied to the target element
// rather than at the document level so we just need to apply/remove user-select: none for each pressed element individually
let $ce801cc8e3ff24b95c928e0152c7b7f2$var$state = 'default';
let $ce801cc8e3ff24b95c928e0152c7b7f2$var$savedUserSelect = '';
let $ce801cc8e3ff24b95c928e0152c7b7f2$var$modifiedElementMap = new WeakMap();

function $ce801cc8e3ff24b95c928e0152c7b7f2$export$disableTextSelection(target) {
  if (isIOS()) {
    if ($ce801cc8e3ff24b95c928e0152c7b7f2$var$state === 'default') {
      $ce801cc8e3ff24b95c928e0152c7b7f2$var$savedUserSelect = document.documentElement.style.webkitUserSelect;
      document.documentElement.style.webkitUserSelect = 'none';
    }

    $ce801cc8e3ff24b95c928e0152c7b7f2$var$state = 'disabled';
  } else if (target) {
    // If not iOS, store the target's original user-select and change to user-select: none
    // Ignore state since it doesn't apply for non iOS
    $ce801cc8e3ff24b95c928e0152c7b7f2$var$modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = 'none';
  }
}

function $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection(target) {
  if (isIOS()) {
    // If the state is already default, there's nothing to do.
    // If it is restoring, then there's no need to queue a second restore.
    if ($ce801cc8e3ff24b95c928e0152c7b7f2$var$state !== 'disabled') {
      return;
    }

    $ce801cc8e3ff24b95c928e0152c7b7f2$var$state = 'restoring'; // There appears to be a delay on iOS where selection still might occur
    // after pointer up, so wait a bit before removing user-select.

    setTimeout(() => {
      // Wait for any CSS transitions to complete so we don't recompute style
      // for the whole page in the middle of the animation and cause jank.
      runAfterTransition(() => {
        // Avoid race conditions
        if ($ce801cc8e3ff24b95c928e0152c7b7f2$var$state === 'restoring') {
          if (document.documentElement.style.webkitUserSelect === 'none') {
            document.documentElement.style.webkitUserSelect = $ce801cc8e3ff24b95c928e0152c7b7f2$var$savedUserSelect || '';
          }

          $ce801cc8e3ff24b95c928e0152c7b7f2$var$savedUserSelect = '';
          $ce801cc8e3ff24b95c928e0152c7b7f2$var$state = 'default';
        }
      });
    }, 300);
  } else {
    // If not iOS, restore the target's original user-select if any
    // Ignore state since it doesn't apply for non iOS
    if (target && $ce801cc8e3ff24b95c928e0152c7b7f2$var$modifiedElementMap.has(target)) {
      let targetOldUserSelect = $ce801cc8e3ff24b95c928e0152c7b7f2$var$modifiedElementMap.get(target);

      if (target.style.userSelect === 'none') {
        target.style.userSelect = targetOldUserSelect;
      }

      if (target.getAttribute('style') === '') {
        target.removeAttribute('style');
      }

      $ce801cc8e3ff24b95c928e0152c7b7f2$var$modifiedElementMap.delete(target);
    }
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// Original licensing for the following method can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/blob/3c713d513195a53788b3f8bb4b70279d68b15bcc/packages/react-interactions/events/src/dom/shared/index.js#L74-L87
// Keyboards, Assistive Technologies, and element.click() all produce a "virtual"
// click event. This is a method of inferring such clicks. Every browser except
// IE 11 only sets a zero value of "detail" for click events that are "virtual".
// However, IE 11 uses a zero value for all click events. For IE 11 we rely on
// the quirk that it produces click events that are of type PointerEvent, and
// where only the "virtual" click lacks a pointerType field.
function $eda9c464f45e6c61a293990c493$export$isVirtualClick(event) {
  // JAWS/NVDA with Firefox.
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }

  return event.detail === 0 && !event.pointerType;
}

const $c6b6d42ec461c27a6a09002bf49a250e$export$PressResponderContext = /*#__PURE__*/_react.createContext(null);

$c6b6d42ec461c27a6a09002bf49a250e$export$PressResponderContext.displayName = 'PressResponderContext';

function $ed8d760564e19d8c7d03a6a4$var$usePressResponderContext(props) {
  // Consume context from <PressResponder> and merge with props.
  let context = useContext($c6b6d42ec461c27a6a09002bf49a250e$export$PressResponderContext);

  if (context) {
    let {
      register
    } = context,
        contextProps = _babelRuntimeHelpersObjectWithoutPropertiesLoose(context, ["register"]);

    props = mergeProps(contextProps, props);
    register();
  }

  useSyncRef(context, props.ref);
  return props;
}
/**
 * Handles press interactions across mouse, touch, keyboard, and screen readers.
 * It normalizes behavior across browsers and platforms, and handles many nuances
 * of dealing with pointer and keyboard events.
 */


function usePress(props) {
  let _usePressResponderCon = $ed8d760564e19d8c7d03a6a4$var$usePressResponderContext(props),
      {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress
  } = _usePressResponderCon,
      domProps = _babelRuntimeHelpersObjectWithoutPropertiesLoose(_usePressResponderCon, ["onPress", "onPressChange", "onPressStart", "onPressEnd", "onPressUp", "isDisabled", "isPressed", "preventFocusOnPress", "shouldCancelOnPointerExit", "allowTextSelectionOnPress", "ref"]);

  let propsRef = useRef(null);
  propsRef.current = {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    shouldCancelOnPointerExit
  };
  let [isPressed, setPressed] = useState(false);
  let ref = useRef({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null
  });
  let {
    addGlobalListener,
    removeAllGlobalListeners
  } = useGlobalListeners();
  let pressProps = useMemo(() => {
    let state = ref.current;

    let triggerPressStart = (originalEvent, pointerType) => {
      let {
        onPressStart,
        onPressChange,
        isDisabled
      } = propsRef.current;

      if (isDisabled || state.didFirePressStart) {
        return;
      }

      if (onPressStart) {
        onPressStart({
          type: 'pressstart',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }

      if (onPressChange) {
        onPressChange(true);
      }

      state.didFirePressStart = true;
      setPressed(true);
    };

    let triggerPressEnd = function triggerPressEnd(originalEvent, pointerType, wasPressed) {
      if (wasPressed === void 0) {
        wasPressed = true;
      }

      let {
        onPressEnd,
        onPressChange,
        onPress,
        isDisabled
      } = propsRef.current;

      if (!state.didFirePressStart) {
        return;
      }

      state.ignoreClickAfterPress = true;
      state.didFirePressStart = false;

      if (onPressEnd) {
        onPressEnd({
          type: 'pressend',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }

      if (onPressChange) {
        onPressChange(false);
      }

      setPressed(false);

      if (onPress && wasPressed && !isDisabled) {
        onPress({
          type: 'press',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }
    };

    let triggerPressUp = (originalEvent, pointerType) => {
      let {
        onPressUp,
        isDisabled
      } = propsRef.current;

      if (isDisabled) {
        return;
      }

      if (onPressUp) {
        onPressUp({
          type: 'pressup',
          pointerType,
          target: originalEvent.currentTarget,
          shiftKey: originalEvent.shiftKey,
          metaKey: originalEvent.metaKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey
        });
      }
    };

    let cancel = e => {
      if (state.isPressed) {
        if (state.isOverTarget) {
          triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType, false);
        }

        state.isPressed = false;
        state.isOverTarget = false;
        state.activePointerId = null;
        state.pointerType = null;
        removeAllGlobalListeners();

        if (!allowTextSelectionOnPress) {
          $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection(state.target);
        }
      }
    };

    let pressProps = {
      onKeyDown(e) {
        if ($ed8d760564e19d8c7d03a6a4$var$isValidKeyboardEvent(e.nativeEvent) && e.currentTarget.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation(); // If the event is repeating, it may have started on a different element
          // after which focus moved to the current element. Ignore these events and
          // only handle the first key down event.

          if (!state.isPressed && !e.repeat) {
            state.target = e.currentTarget;
            state.isPressed = true;
            triggerPressStart(e, 'keyboard'); // Focus may move before the key up event, so register the event on the document
            // instead of the same element where the key down event occurred.

            addGlobalListener(document, 'keyup', onKeyUp, false);
          }
        }
      },

      onKeyUp(e) {
        if ($ed8d760564e19d8c7d03a6a4$var$isValidKeyboardEvent(e.nativeEvent) && !e.repeat && e.currentTarget.contains(e.target)) {
          triggerPressUp($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), 'keyboard');
        }
      },

      onClick(e) {
        if (e && !e.currentTarget.contains(e.target)) {
          return;
        }

        if (e && e.button === 0) {
          e.stopPropagation();

          if (isDisabled) {
            e.preventDefault();
          } // If triggered from a screen reader or by using element.click(),
          // trigger as if it were a keyboard click.


          if (!state.ignoreClickAfterPress && !state.ignoreEmulatedMouseEvents && (state.pointerType === 'virtual' || $eda9c464f45e6c61a293990c493$export$isVirtualClick(e.nativeEvent))) {
            // Ensure the element receives focus (VoiceOver on iOS does not do this)
            if (!isDisabled && !preventFocusOnPress) {
              focusWithoutScrolling(e.currentTarget);
            }

            triggerPressStart(e, 'virtual');
            triggerPressUp(e, 'virtual');
            triggerPressEnd(e, 'virtual');
          }

          state.ignoreEmulatedMouseEvents = false;
          state.ignoreClickAfterPress = false;
        }
      }

    };

    let onKeyUp = e => {
      if (state.isPressed && $ed8d760564e19d8c7d03a6a4$var$isValidKeyboardEvent(e)) {
        e.preventDefault();
        e.stopPropagation();
        state.isPressed = false;
        let target = e.target;
        triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), 'keyboard', state.target.contains(target));
        removeAllGlobalListeners(); // If the target is a link, trigger the click method to open the URL,
        // but defer triggering pressEnd until onClick event handler.

        if (state.target.contains(target) && $ed8d760564e19d8c7d03a6a4$var$isHTMLAnchorLink(state.target) || state.target.getAttribute('role') === 'link') {
          state.target.click();
        }
      }
    };

    if (typeof PointerEvent !== 'undefined') {
      pressProps.onPointerDown = e => {
        // Only handle left clicks, and ignore events that bubbled through portals.
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        } // iOS safari fires pointer events from VoiceOver with incorrect coordinates/target.
        // Ignore and let the onClick handler take care of it instead.
        // https://bugs.webkit.org/show_bug.cgi?id=222627
        // https://bugs.webkit.org/show_bug.cgi?id=223202


        if ($ed8d760564e19d8c7d03a6a4$var$isVirtualPointerEvent(e.nativeEvent)) {
          state.pointerType = 'virtual';
          return;
        } // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on pointer down and handle focusing the pressable element ourselves.


        if ($ed8d760564e19d8c7d03a6a4$var$shouldPreventDefault(e.target)) {
          e.preventDefault();
        }

        state.pointerType = e.pointerType;
        e.stopPropagation();

        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e.pointerId;
          state.target = e.currentTarget;

          if (!isDisabled && !preventFocusOnPress) {
            focusWithoutScrolling(e.currentTarget);
          }

          if (!allowTextSelectionOnPress) {
            $ce801cc8e3ff24b95c928e0152c7b7f2$export$disableTextSelection(state.target);
          }

          triggerPressStart(e, state.pointerType);
          addGlobalListener(document, 'pointermove', onPointerMove, false);
          addGlobalListener(document, 'pointerup', onPointerUp, false);
          addGlobalListener(document, 'pointercancel', onPointerCancel, false);
        }
      };

      pressProps.onMouseDown = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        if (e.button === 0) {
          // Chrome and Firefox on touch Windows devices require mouse down events
          // to be canceled in addition to pointer events, or an extra asynchronous
          // focus event will be fired.
          if ($ed8d760564e19d8c7d03a6a4$var$shouldPreventDefault(e.target)) {
            e.preventDefault();
          }

          e.stopPropagation();
        }
      };

      pressProps.onPointerUp = e => {
        // iOS fires pointerup with zero width and height, so check the pointerType recorded during pointerdown.
        if (!e.currentTarget.contains(e.target) || state.pointerType === 'virtual') {
          return;
        } // Only handle left clicks
        // Safari on iOS sometimes fires pointerup events, even
        // when the touch isn't over the target, so double check.


        if (e.button === 0 && $ed8d760564e19d8c7d03a6a4$var$isOverTarget(e, e.currentTarget)) {
          triggerPressUp(e, state.pointerType || e.pointerType);
        }
      }; // Safari on iOS < 13.2 does not implement pointerenter/pointerleave events correctly.
      // Use pointer move events instead to implement our own hit testing.
      // See https://bugs.webkit.org/show_bug.cgi?id=199803


      let onPointerMove = e => {
        if (e.pointerId !== state.activePointerId) {
          return;
        }

        if ($ed8d760564e19d8c7d03a6a4$var$isOverTarget(e, state.target)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      let onPointerUp = e => {
        if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0) {
          if ($ed8d760564e19d8c7d03a6a4$var$isOverTarget(e, state.target)) {
            triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType);
          } else if (state.isOverTarget) {
            triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType, false);
          }

          state.isPressed = false;
          state.isOverTarget = false;
          state.activePointerId = null;
          state.pointerType = null;
          removeAllGlobalListeners();

          if (!allowTextSelectionOnPress) {
            $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection(state.target);
          }
        }
      };

      let onPointerCancel = e => {
        cancel(e);
      };

      pressProps.onDragStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        } // Safari does not call onPointerCancel when a drag starts, whereas Chrome and Firefox do.


        cancel(e);
      };
    } else {
      pressProps.onMouseDown = e => {
        // Only handle left clicks
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) {
          return;
        } // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on mouse down and handle focusing the pressable element ourselves.


        if ($ed8d760564e19d8c7d03a6a4$var$shouldPreventDefault(e.target)) {
          e.preventDefault();
        }

        e.stopPropagation();

        if (state.ignoreEmulatedMouseEvents) {
          return;
        }

        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e.currentTarget;
        state.pointerType = $eda9c464f45e6c61a293990c493$export$isVirtualClick(e.nativeEvent) ? 'virtual' : 'mouse';

        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        triggerPressStart(e, state.pointerType);
        addGlobalListener(document, 'mouseup', onMouseUp, false);
      };

      pressProps.onMouseEnter = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = true;
          triggerPressStart(e, state.pointerType);
        }
      };

      pressProps.onMouseLeave = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      pressProps.onMouseUp = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        if (!state.ignoreEmulatedMouseEvents && e.button === 0) {
          triggerPressUp(e, state.pointerType);
        }
      };

      let onMouseUp = e => {
        // Only handle left clicks
        if (e.button !== 0) {
          return;
        }

        state.isPressed = false;
        removeAllGlobalListeners();

        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }

        if ($ed8d760564e19d8c7d03a6a4$var$isOverTarget(e, state.target)) {
          triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType);
        } else if (state.isOverTarget) {
          triggerPressEnd($ed8d760564e19d8c7d03a6a4$var$createEvent(state.target, e), state.pointerType, false);
        }

        state.isOverTarget = false;
      };

      pressProps.onTouchStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();
        let touch = $ed8d760564e19d8c7d03a6a4$var$getTouchFromEvent(e.nativeEvent);

        if (!touch) {
          return;
        }

        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e.currentTarget;
        state.pointerType = 'touch'; // Due to browser inconsistencies, especially on mobile browsers, we prevent default
        // on the emulated mouse event and handle focusing the pressable element ourselves.

        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        if (!allowTextSelectionOnPress) {
          $ce801cc8e3ff24b95c928e0152c7b7f2$export$disableTextSelection(state.target);
        }

        triggerPressStart(e, state.pointerType);
        addGlobalListener(window, 'scroll', onScroll, true);
      };

      pressProps.onTouchMove = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (!state.isPressed) {
          return;
        }

        let touch = $ed8d760564e19d8c7d03a6a4$var$getTouchById(e.nativeEvent, state.activePointerId);

        if (touch && $ed8d760564e19d8c7d03a6a4$var$isOverTarget(touch, e.currentTarget)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart(e, state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd(e, state.pointerType, false);

          if (propsRef.current.shouldCancelOnPointerExit) {
            cancel(e);
          }
        }
      };

      pressProps.onTouchEnd = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (!state.isPressed) {
          return;
        }

        let touch = $ed8d760564e19d8c7d03a6a4$var$getTouchById(e.nativeEvent, state.activePointerId);

        if (touch && $ed8d760564e19d8c7d03a6a4$var$isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state.pointerType);
          triggerPressEnd(e, state.pointerType);
        } else if (state.isOverTarget) {
          triggerPressEnd(e, state.pointerType, false);
        }

        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;

        if (!allowTextSelectionOnPress) {
          $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection(state.target);
        }

        removeAllGlobalListeners();
      };

      pressProps.onTouchCancel = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        e.stopPropagation();

        if (state.isPressed) {
          cancel(e);
        }
      };

      let onScroll = e => {
        if (state.isPressed && e.target.contains(state.target)) {
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false
          });
        }
      };

      pressProps.onDragStart = e => {
        if (!e.currentTarget.contains(e.target)) {
          return;
        }

        cancel(e);
      };
    }

    return pressProps;
  }, [addGlobalListener, isDisabled, preventFocusOnPress, removeAllGlobalListeners, allowTextSelectionOnPress]); // Remove user-select: none in case component unmounts immediately after pressStart
  // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    return () => {
      if (!allowTextSelectionOnPress) {
        $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection(ref.current.target);
      }
    };
  }, [allowTextSelectionOnPress]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: mergeProps(domProps, pressProps)
  };
}

exports.usePress = usePress;

function $ed8d760564e19d8c7d03a6a4$var$isHTMLAnchorLink(target) {
  return target.tagName === 'A' && target.hasAttribute('href');
}

function $ed8d760564e19d8c7d03a6a4$var$isValidKeyboardEvent(event) {
  const {
    key,
    code,
    target
  } = event;
  const element = target;
  const {
    tagName,
    isContentEditable
  } = element;
  const role = element.getAttribute('role'); // Accessibility for keyboards. Space and Enter only.
  // "Spacebar" is for IE 11

  return (key === 'Enter' || key === ' ' || key === 'Spacebar' || code === 'Space') && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && isContentEditable !== true && ( // A link with a valid href should be handled natively,
  // unless it also has role='button' and was triggered using Space.
  !$ed8d760564e19d8c7d03a6a4$var$isHTMLAnchorLink(element) || role === 'button' && key !== 'Enter') && // An element with role='link' should only trigger with Enter key
  !(role === 'link' && key !== 'Enter');
}

function $ed8d760564e19d8c7d03a6a4$var$getTouchFromEvent(event) {
  const {
    targetTouches
  } = event;

  if (targetTouches.length > 0) {
    return targetTouches[0];
  }

  return null;
}

function $ed8d760564e19d8c7d03a6a4$var$getTouchById(event, pointerId) {
  const changedTouches = event.changedTouches;

  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];

    if (touch.identifier === pointerId) {
      return touch;
    }
  }

  return null;
}

function $ed8d760564e19d8c7d03a6a4$var$createEvent(target, e) {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey
  };
}

function $ed8d760564e19d8c7d03a6a4$var$getPointClientRect(point) {
  let offsetX = point.width / 2 || point.radiusX || 0;
  let offsetY = point.height / 2 || point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX
  };
}

function $ed8d760564e19d8c7d03a6a4$var$areRectanglesOverlapping(a, b) {
  // check if they cannot overlap on x axis
  if (a.left > b.right || b.left > a.right) {
    return false;
  } // check if they cannot overlap on y axis


  if (a.top > b.bottom || b.top > a.bottom) {
    return false;
  }

  return true;
}

function $ed8d760564e19d8c7d03a6a4$var$isOverTarget(point, target) {
  let rect = target.getBoundingClientRect();
  let pointRect = $ed8d760564e19d8c7d03a6a4$var$getPointClientRect(point);
  return $ed8d760564e19d8c7d03a6a4$var$areRectanglesOverlapping(rect, pointRect);
}

function $ed8d760564e19d8c7d03a6a4$var$shouldPreventDefault(target) {
  // We cannot prevent default if the target is inside a draggable element.
  return !target.closest('[draggable="true"]');
}

function $ed8d760564e19d8c7d03a6a4$var$isVirtualPointerEvent(event) {
  // If the pointer size is zero, then we assume it's from a screen reader.
  // Android TalkBack double tap will sometimes return a event with width and height of 1
  // and pointerType === 'mouse' so we need to check for a specific combination of event attributes.
  // Cannot use "event.pressure === 0" as the sole check due to Safari pointer events always returning pressure === 0
  // instead of .5, see https://bugs.webkit.org/show_bug.cgi?id=206216
  return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0;
}

const Pressable = /*#__PURE__*/_react.forwardRef((_ref, ref) => {
  var _ref2;

  let {
    children
  } = _ref,
      props = _babelRuntimeHelpersObjectWithoutPropertiesLoose(_ref, ["children"]);

  let newRef = useRef();
  ref = (_ref2 = ref) != null ? _ref2 : newRef;
  let {
    pressProps
  } = usePress(_babelRuntimeHelpersExtends({}, props, {
    ref
  }));

  let child = _react.Children.only(children);

  return /*#__PURE__*/_react.cloneElement(child, // @ts-ignore
  _babelRuntimeHelpersExtends({
    ref
  }, mergeProps(child.props, pressProps)));
});

exports.Pressable = Pressable;

const PressResponder = /*#__PURE__*/_react.forwardRef((_ref, ref) => {
  let {
    children
  } = _ref,
      props = _babelRuntimeHelpersObjectWithoutPropertiesLoose(_ref, ["children"]);

  let isRegistered = useRef(false);
  let prevContext = useContext($c6b6d42ec461c27a6a09002bf49a250e$export$PressResponderContext);
  let context = mergeProps(prevContext || {}, _babelRuntimeHelpersExtends({}, props, {
    ref: ref || (prevContext == null ? void 0 : prevContext.ref),

    register() {
      isRegistered.current = true;

      if (prevContext) {
        prevContext.register();
      }
    }

  }));
  useSyncRef(prevContext, ref);
  useEffect(() => {
    if (!isRegistered.current) {
      console.warn('A PressResponder was rendered without a pressable child. ' + 'Either call the usePress hook, or wrap your DOM node with <Pressable> component.');
    }
  }, []);
  return /*#__PURE__*/_react.createElement($c6b6d42ec461c27a6a09002bf49a250e$export$PressResponderContext.Provider, {
    value: context
  }, children);
});

exports.PressResponder = PressResponder;

// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

/**
 * Handles focus events for the immediate target.
 * Focus events on child elements will be ignored.
 */
function useFocus(props) {
  if (props.isDisabled) {
    return {
      focusProps: {}
    };
  }

  let onFocus, onBlur;

  if (props.onFocus || props.onFocusChange) {
    onFocus = e => {
      if (e.target === e.currentTarget) {
        if (props.onFocus) {
          props.onFocus(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(true);
        }
      }
    };
  }

  if (props.onBlur || props.onFocusChange) {
    onBlur = e => {
      if (e.target === e.currentTarget) {
        if (props.onBlur) {
          props.onBlur(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(false);
        }
      }
    };
  }

  return {
    focusProps: {
      onFocus,
      onBlur
    }
  };
}

exports.useFocus = useFocus;
let $b83372066b2b4e1d9257843b2455c$var$currentModality = null;
let $b83372066b2b4e1d9257843b2455c$var$changeHandlers = new Set();
let $b83372066b2b4e1d9257843b2455c$var$hasSetupGlobalListeners = false;
let $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = false;
let $b83372066b2b4e1d9257843b2455c$var$hasBlurredWindowRecently = false; // Only Tab or Esc keys will make focus visible on text input elements

const $b83372066b2b4e1d9257843b2455c$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};

function $b83372066b2b4e1d9257843b2455c$var$triggerChangeHandlers(modality, e) {
  for (let handler of $b83372066b2b4e1d9257843b2455c$var$changeHandlers) {
    handler(modality, e);
  }
}
/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
 */


function $b83372066b2b4e1d9257843b2455c$var$isValidKey(e) {
  // Control and Shift keys trigger when navigating back to the tab with keyboard.
  return !(e.metaKey || !isMac() && e.altKey || e.ctrlKey || e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta');
}

function $b83372066b2b4e1d9257843b2455c$var$handleKeyboardEvent(e) {
  $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = true;

  if ($b83372066b2b4e1d9257843b2455c$var$isValidKey(e)) {
    $b83372066b2b4e1d9257843b2455c$var$currentModality = 'keyboard';
    $b83372066b2b4e1d9257843b2455c$var$triggerChangeHandlers('keyboard', e);
  }
}

function $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent(e) {
  $b83372066b2b4e1d9257843b2455c$var$currentModality = 'pointer';

  if (e.type === 'mousedown' || e.type === 'pointerdown') {
    $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = true;
    $b83372066b2b4e1d9257843b2455c$var$triggerChangeHandlers('pointer', e);
  }
}

function $b83372066b2b4e1d9257843b2455c$var$handleClickEvent(e) {
  if ($eda9c464f45e6c61a293990c493$export$isVirtualClick(e)) {
    $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = true;
    $b83372066b2b4e1d9257843b2455c$var$currentModality = 'virtual';
  }
}

function $b83372066b2b4e1d9257843b2455c$var$handleFocusEvent(e) {
  // Firefox fires two extra focus events when the user first clicks into an iframe:
  // first on the window, then on the document. We ignore these events so they don't
  // cause keyboard focus rings to appear.
  if (e.target === window || e.target === document) {
    return;
  } // If a focus event occurs without a preceding keyboard or pointer event, switch to virtual modality.
  // This occurs, for example, when navigating a form with the next/previous buttons on iOS.


  if (!$b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus && !$b83372066b2b4e1d9257843b2455c$var$hasBlurredWindowRecently) {
    $b83372066b2b4e1d9257843b2455c$var$currentModality = 'virtual';
    $b83372066b2b4e1d9257843b2455c$var$triggerChangeHandlers('virtual', e);
  }

  $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = false;
  $b83372066b2b4e1d9257843b2455c$var$hasBlurredWindowRecently = false;
}

function $b83372066b2b4e1d9257843b2455c$var$handleWindowBlur() {
  // When the window is blurred, reset state. This is necessary when tabbing out of the window,
  // for example, since a subsequent focus event won't be fired.
  $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = false;
  $b83372066b2b4e1d9257843b2455c$var$hasBlurredWindowRecently = true;
}
/**
 * Setup global event listeners to control when keyboard focus style should be visible.
 */


function $b83372066b2b4e1d9257843b2455c$var$setupGlobalFocusEvents() {
  if (typeof window === 'undefined' || $b83372066b2b4e1d9257843b2455c$var$hasSetupGlobalListeners) {
    return;
  } // Programmatic focus() calls shouldn't affect the current input modality.
  // However, we need to detect other cases when a focus event occurs without
  // a preceding user event (e.g. screen reader focus). Overriding the focus
  // method on HTMLElement.prototype is a bit hacky, but works.


  let focus = HTMLElement.prototype.focus;

  HTMLElement.prototype.focus = function () {
    $b83372066b2b4e1d9257843b2455c$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };

  document.addEventListener('keydown', $b83372066b2b4e1d9257843b2455c$var$handleKeyboardEvent, true);
  document.addEventListener('keyup', $b83372066b2b4e1d9257843b2455c$var$handleKeyboardEvent, true);
  document.addEventListener('click', $b83372066b2b4e1d9257843b2455c$var$handleClickEvent, true); // Register focus events on the window so they are sure to happen
  // before React's event listeners (registered on the document).

  window.addEventListener('focus', $b83372066b2b4e1d9257843b2455c$var$handleFocusEvent, true);
  window.addEventListener('blur', $b83372066b2b4e1d9257843b2455c$var$handleWindowBlur, false);

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
    document.addEventListener('pointermove', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
    document.addEventListener('pointerup', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
  } else {
    document.addEventListener('mousedown', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
    document.addEventListener('mousemove', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
    document.addEventListener('mouseup', $b83372066b2b4e1d9257843b2455c$var$handlePointerEvent, true);
  }

  $b83372066b2b4e1d9257843b2455c$var$hasSetupGlobalListeners = true;
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    $b83372066b2b4e1d9257843b2455c$var$setupGlobalFocusEvents();
  } else {
    document.addEventListener('DOMContentLoaded', $b83372066b2b4e1d9257843b2455c$var$setupGlobalFocusEvents);
  }
}
/**
 * If true, keyboard focus is visible.
 */


function isFocusVisible() {
  return $b83372066b2b4e1d9257843b2455c$var$currentModality !== 'pointer';
}

exports.isFocusVisible = isFocusVisible;

function getInteractionModality() {
  return $b83372066b2b4e1d9257843b2455c$var$currentModality;
}

exports.getInteractionModality = getInteractionModality;

function setInteractionModality(modality) {
  $b83372066b2b4e1d9257843b2455c$var$currentModality = modality;
  $b83372066b2b4e1d9257843b2455c$var$triggerChangeHandlers(modality, null);
}
/**
 * Keeps state of the current modality.
 */


exports.setInteractionModality = setInteractionModality;

function useInteractionModality() {
  $b83372066b2b4e1d9257843b2455c$var$setupGlobalFocusEvents();
  let [modality, setModality] = useState($b83372066b2b4e1d9257843b2455c$var$currentModality);
  useEffect(() => {
    let handler = () => {
      setModality($b83372066b2b4e1d9257843b2455c$var$currentModality);
    };

    $b83372066b2b4e1d9257843b2455c$var$changeHandlers.add(handler);
    return () => {
      $b83372066b2b4e1d9257843b2455c$var$changeHandlers.delete(handler);
    };
  }, []);
  return modality;
}
/**
 * If this is attached to text input component, return if the event is a focus event (Tab/Escape keys pressed) so that
 * focus visible style can be properly set.
 */


exports.useInteractionModality = useInteractionModality;

function $b83372066b2b4e1d9257843b2455c$var$isKeyboardFocusEvent(isTextInput, modality, e) {
  return !(isTextInput && modality === 'keyboard' && e instanceof KeyboardEvent && !$b83372066b2b4e1d9257843b2455c$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
/**
 * Manages focus visible state for the page, and subscribes individual components for updates.
 */


function useFocusVisible(props) {
  if (props === void 0) {
    props = {};
  }

  let {
    isTextInput,
    autoFocus
  } = props;
  let [isFocusVisibleState, setFocusVisible] = useState(autoFocus || isFocusVisible());
  useFocusVisibleListener(isFocusVisible => {
    setFocusVisible(isFocusVisible);
  }, [isTextInput], {
    isTextInput
  });
  return {
    isFocusVisible: isFocusVisibleState
  };
}
/**
 * Listens for trigger change and reports if focus is visible (i.e., modality is not pointer).
 */


exports.useFocusVisible = useFocusVisible;

function useFocusVisibleListener(fn, deps, opts) {
  $b83372066b2b4e1d9257843b2455c$var$setupGlobalFocusEvents();
  useEffect(() => {
    let handler = (modality, e) => {
      if (!$b83372066b2b4e1d9257843b2455c$var$isKeyboardFocusEvent(opts == null ? void 0 : opts.isTextInput, modality, e)) {
        return;
      }

      fn(isFocusVisible());
    };

    $b83372066b2b4e1d9257843b2455c$var$changeHandlers.add(handler);
    return () => $b83372066b2b4e1d9257843b2455c$var$changeHandlers.delete(handler);
  }, deps);
}

exports.useFocusVisibleListener = useFocusVisibleListener;

/**
 * Handles focus events for the target and its descendants.
 */
function useFocusWithin(props) {
  let state = useRef({
    isFocusWithin: false
  }).current;

  if (props.isDisabled) {
    return {
      focusWithinProps: {}
    };
  }

  let onFocus = e => {
    if (!state.isFocusWithin) {
      if (props.onFocusWithin) {
        props.onFocusWithin(e);
      }

      if (props.onFocusWithinChange) {
        props.onFocusWithinChange(true);
      }

      state.isFocusWithin = true;
    }
  };

  let onBlur = e => {
    // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
    // when moving focus inside the element. Only trigger if the currentTarget doesn't
    // include the relatedTarget (where focus is moving).
    if (state.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
      if (props.onBlurWithin) {
        props.onBlurWithin(e);
      }

      if (props.onFocusWithinChange) {
        props.onFocusWithinChange(false);
      }

      state.isFocusWithin = false;
    }
  };

  return {
    focusWithinProps: {
      onFocus: onFocus,
      onBlur: onBlur
    }
  };
}

exports.useFocusWithin = useFocusWithin;
// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let $c4bc39b19aed2151a14d70718d3e34b1$var$globalIgnoreEmulatedMouseEvents = false;
let $c4bc39b19aed2151a14d70718d3e34b1$var$hoverCount = 0;

function $c4bc39b19aed2151a14d70718d3e34b1$var$setGlobalIgnoreEmulatedMouseEvents() {
  $c4bc39b19aed2151a14d70718d3e34b1$var$globalIgnoreEmulatedMouseEvents = true; // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
  // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
  // devices that don't have this quirk, we don't want to ignore a mouse hover sometime in
  // the distant future because a user previously touched the element.

  setTimeout(() => {
    $c4bc39b19aed2151a14d70718d3e34b1$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}

function $c4bc39b19aed2151a14d70718d3e34b1$var$handleGlobalPointerEvent(e) {
  if (e.pointerType === 'touch') {
    $c4bc39b19aed2151a14d70718d3e34b1$var$setGlobalIgnoreEmulatedMouseEvents();
  }
}

function $c4bc39b19aed2151a14d70718d3e34b1$var$setupGlobalTouchEvents() {
  if (typeof document === 'undefined') {
    return;
  }

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerup', $c4bc39b19aed2151a14d70718d3e34b1$var$handleGlobalPointerEvent);
  } else {
    document.addEventListener('touchend', $c4bc39b19aed2151a14d70718d3e34b1$var$setGlobalIgnoreEmulatedMouseEvents);
  }

  $c4bc39b19aed2151a14d70718d3e34b1$var$hoverCount++;
  return () => {
    $c4bc39b19aed2151a14d70718d3e34b1$var$hoverCount--;

    if ($c4bc39b19aed2151a14d70718d3e34b1$var$hoverCount > 0) {
      return;
    }

    if (typeof PointerEvent !== 'undefined') {
      document.removeEventListener('pointerup', $c4bc39b19aed2151a14d70718d3e34b1$var$handleGlobalPointerEvent);
    } else {
      document.removeEventListener('touchend', $c4bc39b19aed2151a14d70718d3e34b1$var$setGlobalIgnoreEmulatedMouseEvents);
    }
  };
}
/**
 * Handles pointer hover interactions for an element. Normalizes behavior
 * across browsers and platforms, and ignores emulated mouse events on touch devices.
 */


function useHover(props) {
  let {
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled
  } = props;
  let [isHovered, setHovered] = useState(false);
  let state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: '',
    target: null
  }).current;
  useEffect($c4bc39b19aed2151a14d70718d3e34b1$var$setupGlobalTouchEvents, []);
  let {
    hoverProps,
    triggerHoverEnd
  } = useMemo(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;

      if (isDisabled || pointerType === 'touch' || state.isHovered || !event.currentTarget.contains(event.target)) {
        return;
      }

      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;

      if (onHoverStart) {
        onHoverStart({
          type: 'hoverstart',
          target,
          pointerType
        });
      }

      if (onHoverChange) {
        onHoverChange(true);
      }

      setHovered(true);
    };

    let triggerHoverEnd = (event, pointerType) => {
      state.pointerType = '';
      state.target = null;

      if (pointerType === 'touch' || !state.isHovered) {
        return;
      }

      state.isHovered = false;
      let target = event.currentTarget;

      if (onHoverEnd) {
        onHoverEnd({
          type: 'hoverend',
          target,
          pointerType
        });
      }

      if (onHoverChange) {
        onHoverChange(false);
      }

      setHovered(false);
    };

    let hoverProps = {};

    if (typeof PointerEvent !== 'undefined') {
      hoverProps.onPointerEnter = e => {
        if ($c4bc39b19aed2151a14d70718d3e34b1$var$globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') {
          return;
        }

        triggerHoverStart(e, e.pointerType);
      };

      hoverProps.onPointerLeave = e => {
        if (!isDisabled && e.currentTarget.contains(e.target)) {
          triggerHoverEnd(e, e.pointerType);
        }
      };
    } else {
      hoverProps.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };

      hoverProps.onMouseEnter = e => {
        if (!state.ignoreEmulatedMouseEvents && !$c4bc39b19aed2151a14d70718d3e34b1$var$globalIgnoreEmulatedMouseEvents) {
          triggerHoverStart(e, 'mouse');
        }

        state.ignoreEmulatedMouseEvents = false;
      };

      hoverProps.onMouseLeave = e => {
        if (!isDisabled && e.currentTarget.contains(e.target)) {
          triggerHoverEnd(e, 'mouse');
        }
      };
    }

    return {
      hoverProps,
      triggerHoverEnd
    };
  }, [onHoverStart, onHoverChange, onHoverEnd, isDisabled, state]);
  useEffect(() => {
    // Call the triggerHoverEnd as soon as isDisabled changes to true
    // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
    if (isDisabled) {
      triggerHoverEnd({
        currentTarget: state.target
      }, state.pointerType);
    }
  }, [isDisabled]);
  return {
    hoverProps,
    isHovered
  };
}

exports.useHover = useHover;

/**
 * Example, used in components like Dialogs and Popovers so they can close
 * when a user clicks outside them.
 */
function useInteractOutside(props) {
  let {
    ref,
    onInteractOutside,
    isDisabled,
    onInteractOutsideStart
  } = props;
  let stateRef = useRef({
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false,
    onInteractOutside,
    onInteractOutsideStart
  });
  let state = stateRef.current;
  state.onInteractOutside = onInteractOutside;
  state.onInteractOutsideStart = onInteractOutsideStart;
  useEffect(() => {
    if (isDisabled) {
      return;
    }

    let onPointerDown = e => {
      if ($f07e167670fb16f6a9d7f8a0eda7e156$var$isValidEvent(e, ref) && state.onInteractOutside) {
        if (state.onInteractOutsideStart) {
          state.onInteractOutsideStart(e);
        }

        state.isPointerDown = true;
      }
    }; // Use pointer events if available. Otherwise, fall back to mouse and touch events.


    if (typeof PointerEvent !== 'undefined') {
      let onPointerUp = e => {
        if (state.isPointerDown && state.onInteractOutside && $f07e167670fb16f6a9d7f8a0eda7e156$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      }; // changing these to capture phase fixed combobox


      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('pointerup', onPointerUp, true);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('pointerup', onPointerUp, true);
      };
    } else {
      let onMouseUp = e => {
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
        } else if (state.isPointerDown && state.onInteractOutside && $f07e167670fb16f6a9d7f8a0eda7e156$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };

      let onTouchEnd = e => {
        state.ignoreEmulatedMouseEvents = true;

        if (state.onInteractOutside && state.isPointerDown && $f07e167670fb16f6a9d7f8a0eda7e156$var$isValidEvent(e, ref)) {
          state.isPointerDown = false;
          state.onInteractOutside(e);
        }
      };

      document.addEventListener('mousedown', onPointerDown, true);
      document.addEventListener('mouseup', onMouseUp, true);
      document.addEventListener('touchstart', onPointerDown, true);
      document.addEventListener('touchend', onTouchEnd, true);
      return () => {
        document.removeEventListener('mousedown', onPointerDown, true);
        document.removeEventListener('mouseup', onMouseUp, true);
        document.removeEventListener('touchstart', onPointerDown, true);
        document.removeEventListener('touchend', onTouchEnd, true);
      };
    }
  }, [ref, state, isDisabled]);
}

exports.useInteractOutside = useInteractOutside;

function $f07e167670fb16f6a9d7f8a0eda7e156$var$isValidEvent(event, ref) {
  if (event.button > 0) {
    return false;
  } // if the event target is no longer in the document


  if (event.target) {
    const ownerDocument = event.target.ownerDocument;

    if (!ownerDocument || !ownerDocument.documentElement.contains(event.target)) {
      return false;
    }
  }

  return ref.current && !ref.current.contains(event.target);
}

/**
 * This function wraps a React event handler to make stopPropagation the default, and support continuePropagation instead.
 */
function $df2a10e65550e0fb9bbbe4a76eee490$export$createEventHandler(handler) {
  if (!handler) {
    return;
  }

  let shouldStopPropagation = true;
  return e => {
    let event = _babelRuntimeHelpersExtends({}, e, {
      preventDefault() {
        e.preventDefault();
      },

      isDefaultPrevented() {
        return e.isDefaultPrevented();
      },

      stopPropagation() {
        console.error('stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.');
      },

      continuePropagation() {
        shouldStopPropagation = false;
      }

    });

    handler(event);

    if (shouldStopPropagation) {
      e.stopPropagation();
    }
  };
}

/**
 * Handles keyboard interactions for a focusable element.
 */
function useKeyboard(props) {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: $df2a10e65550e0fb9bbbe4a76eee490$export$createEventHandler(props.onKeyDown),
      onKeyUp: $df2a10e65550e0fb9bbbe4a76eee490$export$createEventHandler(props.onKeyUp)
    }
  };
}

exports.useKeyboard = useKeyboard;

/**
 * Handles move interactions across mouse, touch, and keyboard, including dragging with
 * the mouse or touch, and using the arrow keys. Normalizes behavior across browsers and
 * platforms, and ignores emulated mouse events on touch devices.
 */
function useMove(props) {
  let {
    onMoveStart,
    onMove,
    onMoveEnd
  } = props;
  let state = useRef({
    didMove: false,
    lastPosition: null,
    id: null
  });
  let {
    addGlobalListener,
    removeGlobalListener
  } = useGlobalListeners();
  let moveProps = useMemo(() => {
    let moveProps = {};

    let start = () => {
      $ce801cc8e3ff24b95c928e0152c7b7f2$export$disableTextSelection();
      state.current.didMove = false;
    };

    let move = (pointerType, deltaX, deltaY) => {
      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      if (!state.current.didMove) {
        state.current.didMove = true;
        onMoveStart == null ? void 0 : onMoveStart({
          type: 'movestart',
          pointerType
        });
      }

      onMove({
        type: 'move',
        pointerType,
        deltaX: deltaX,
        deltaY: deltaY
      });
    };

    let end = pointerType => {
      $ce801cc8e3ff24b95c928e0152c7b7f2$export$restoreTextSelection();

      if (state.current.didMove) {
        onMoveEnd == null ? void 0 : onMoveEnd({
          type: 'moveend',
          pointerType
        });
      }
    };

    if (typeof PointerEvent === 'undefined') {
      let onMouseMove = e => {
        if (e.button === 0) {
          move('mouse', e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };

      let onMouseUp = e => {
        if (e.button === 0) {
          end('mouse');
          removeGlobalListener(window, 'mousemove', onMouseMove, false);
          removeGlobalListener(window, 'mouseup', onMouseUp, false);
        }
      };

      moveProps.onMouseDown = e => {
        if (e.button === 0) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          addGlobalListener(window, 'mousemove', onMouseMove, false);
          addGlobalListener(window, 'mouseup', onMouseUp, false);
        }
      };

      let onTouchMove = e => {
        // @ts-ignore
        let touch = [...e.changedTouches].findIndex((_ref) => {
          let {
            identifier
          } = _ref;
          return identifier === state.current.id;
        });

        if (touch >= 0) {
          let {
            pageX,
            pageY
          } = e.changedTouches[touch];
          move('touch', pageX - state.current.lastPosition.pageX, pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX,
            pageY
          };
        }
      };

      let onTouchEnd = e => {
        // @ts-ignore
        let touch = [...e.changedTouches].findIndex((_ref2) => {
          let {
            identifier
          } = _ref2;
          return identifier === state.current.id;
        });

        if (touch >= 0) {
          end('touch');
          state.current.id = null;
          removeGlobalListener(window, 'touchmove', onTouchMove);
          removeGlobalListener(window, 'touchend', onTouchEnd);
          removeGlobalListener(window, 'touchcancel', onTouchEnd);
        }
      };

      moveProps.onTouchStart = e => {
        if (e.changedTouches.length === 0 || state.current.id != null) {
          return;
        }

        let {
          pageX,
          pageY,
          identifier
        } = e.changedTouches[0];
        start();
        e.stopPropagation();
        e.preventDefault();
        state.current.lastPosition = {
          pageX,
          pageY
        };
        state.current.id = identifier;
        addGlobalListener(window, 'touchmove', onTouchMove, false);
        addGlobalListener(window, 'touchend', onTouchEnd, false);
        addGlobalListener(window, 'touchcancel', onTouchEnd, false);
      };
    } else {
      let onPointerMove = e => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          let pointerType = e.pointerType || 'mouse'; // Problems with PointerEvent#movementX/movementY:
          // 1. it is always 0 on macOS Safari.
          // 2. On Chrome Android, it's scaled by devicePixelRatio, but not on Chrome macOS

          move(pointerType, e.pageX - state.current.lastPosition.pageX, e.pageY - state.current.lastPosition.pageY);
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
        }
      };

      let onPointerUp = e => {
        if (e.pointerId === state.current.id) {
          // @ts-ignore
          let pointerType = e.pointerType || 'mouse';
          end(pointerType);
          state.current.id = null;
          removeGlobalListener(window, 'pointermove', onPointerMove, false);
          removeGlobalListener(window, 'pointerup', onPointerUp, false);
          removeGlobalListener(window, 'pointercancel', onPointerUp, false);
        }
      };

      moveProps.onPointerDown = e => {
        if (e.button === 0 && state.current.id == null) {
          start();
          e.stopPropagation();
          e.preventDefault();
          state.current.lastPosition = {
            pageX: e.pageX,
            pageY: e.pageY
          };
          state.current.id = e.pointerId;
          addGlobalListener(window, 'pointermove', onPointerMove, false);
          addGlobalListener(window, 'pointerup', onPointerUp, false);
          addGlobalListener(window, 'pointercancel', onPointerUp, false);
        }
      };
    }

    let triggerKeyboardMove = (deltaX, deltaY) => {
      start();
      move('keyboard', deltaX, deltaY);
      end('keyboard');
    };

    moveProps.onKeyDown = e => {
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(-1, 0);
          break;

        case 'Right':
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(1, 0);
          break;

        case 'Up':
        case 'ArrowUp':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(0, -1);
          break;

        case 'Down':
        case 'ArrowDown':
          e.preventDefault();
          e.stopPropagation();
          triggerKeyboardMove(0, 1);
          break;
      }
    };

    return moveProps;
  }, [state, onMoveStart, onMove, onMoveEnd, addGlobalListener, removeGlobalListener]);
  return {
    moveProps
  };
}

exports.useMove = useMove;

// scroll wheel needs to be added not passively so it's cancelable, small helper hook to remember that
function useScrollWheel(props, ref) {
  let {
    onScroll,
    isDisabled
  } = props;
  let onScrollHandler = useCallback(e => {
    // If the ctrlKey is pressed, this is a zoom event, do nothing.
    if (e.ctrlKey) {
      return;
    } // stop scrolling the page


    e.preventDefault();
    e.stopPropagation();

    if (onScroll) {
      onScroll({
        deltaX: e.deltaX,
        deltaY: e.deltaY
      });
    }
  }, [onScroll]);
  useEvent(ref, 'wheel', isDisabled ? null : onScrollHandler);
}

exports.useScrollWheel = useScrollWheel;
const $c770c63e4e3d986910ca483d5a$var$DEFAULT_THRESHOLD = 500;
/**
 * Handles long press interactions across mouse and touch devices. Supports a customizable time threshold,
 * accessibility description, and normalizes behavior across browsers and devices.
 */

function useLongPress(props) {
  let {
    isDisabled,
    onLongPressStart,
    onLongPressEnd,
    onLongPress,
    threshold = $c770c63e4e3d986910ca483d5a$var$DEFAULT_THRESHOLD,
    accessibilityDescription
  } = props;
  const timeRef = useRef(null);
  let {
    addGlobalListener,
    removeGlobalListener
  } = useGlobalListeners();
  let {
    pressProps
  } = usePress({
    isDisabled,

    onPressStart(e) {
      if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
        if (onLongPressStart) {
          onLongPressStart(_babelRuntimeHelpersExtends({}, e, {
            type: 'longpressstart'
          }));
        }

        timeRef.current = setTimeout(() => {
          // Prevent other usePress handlers from also handling this event.
          e.target.dispatchEvent(new PointerEvent('pointercancel', {
            bubbles: true
          }));

          if (onLongPress) {
            onLongPress(_babelRuntimeHelpersExtends({}, e, {
              type: 'longpress'
            }));
          }

          timeRef.current = null;
        }, threshold); // Prevent context menu, which may be opened on long press on touch devices

        if (e.pointerType === 'touch') {
          let onContextMenu = e => {
            e.preventDefault();
          };

          addGlobalListener(e.target, 'contextmenu', onContextMenu, {
            once: true
          });
          addGlobalListener(window, 'pointerup', () => {
            // If no contextmenu event is fired quickly after pointerup, remove the handler
            // so future context menu events outside a long press are not prevented.
            setTimeout(() => {
              removeGlobalListener(e.target, 'contextmenu', onContextMenu);
            }, 30);
          }, {
            once: true
          });
        }
      }
    },

    onPressEnd(e) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }

      if (onLongPressEnd && (e.pointerType === 'mouse' || e.pointerType === 'touch')) {
        onLongPressEnd(_babelRuntimeHelpersExtends({}, e, {
          type: 'longpressend'
        }));
      }
    }

  });
  let descriptionProps = useDescription(onLongPress && !isDisabled ? accessibilityDescription : null);
  return {
    longPressProps: mergeProps(pressProps, descriptionProps)
  };
}

exports.useLongPress = useLongPress;
//# sourceMappingURL=main.js.map
