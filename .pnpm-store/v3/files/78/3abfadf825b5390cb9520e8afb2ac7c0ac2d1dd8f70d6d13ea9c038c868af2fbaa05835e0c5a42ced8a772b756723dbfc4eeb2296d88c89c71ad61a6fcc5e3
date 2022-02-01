var {
  clamp,
  snapValueToStep
} = require("@react-stately/utils");

exports.snapValueToStep = snapValueToStep;
exports.clamp = clamp;

var _clsx = $parcel$interopDefault(require("clsx"));

var _babelRuntimeHelpersExtends = $parcel$interopDefault(require("@babel/runtime/helpers/extends"));

var {
  useSSRSafeId
} = require("@react-aria/ssr");

var _react2 = require("react");

var _react = $parcel$interopDefault(_react2);

var {
  useCallback,
  useEffect,
  useRef,
  useState
} = _react2;

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

// During SSR, React emits a warning when calling useLayoutEffect.
// Since neither useLayoutEffect nor useEffect run on the server,
// we can suppress this by replace it with a noop on the server.
const useLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : () => {};
exports.useLayoutEffect = useLayoutEffect;
let $f09fcd7f5f367fc80aacfeac62ed2$var$idsUpdaterMap = new Map();
/**
 * If a default is not provided, generate an id.
 * @param defaultId - Default component id.
 */

function useId(defaultId) {
  let isRendering = useRef(true);
  isRendering.current = true;
  let [value, setValue] = useState(defaultId);
  let nextId = useRef(null);
  let res = useSSRSafeId(value); // don't memo this, we want it new each render so that the Effects always run

  let updateValue = val => {
    if (!isRendering.current) {
      setValue(val);
    } else {
      nextId.current = val;
    }
  };

  $f09fcd7f5f367fc80aacfeac62ed2$var$idsUpdaterMap.set(res, updateValue);
  useLayoutEffect(() => {
    isRendering.current = false;
  }, [updateValue]);
  useLayoutEffect(() => {
    let r = res;
    return () => {
      $f09fcd7f5f367fc80aacfeac62ed2$var$idsUpdaterMap.delete(r);
    };
  }, [res]);
  useEffect(() => {
    let newId = nextId.current;

    if (newId) {
      setValue(newId);
      nextId.current = null;
    }
  }, [setValue, updateValue]);
  return res;
}
/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */


exports.useId = useId;

function mergeIds(idA, idB) {
  if (idA === idB) {
    return idA;
  }

  let setIdA = $f09fcd7f5f367fc80aacfeac62ed2$var$idsUpdaterMap.get(idA);

  if (setIdA) {
    setIdA(idB);
    return idB;
  }

  let setIdB = $f09fcd7f5f367fc80aacfeac62ed2$var$idsUpdaterMap.get(idB);

  if (setIdB) {
    setIdB(idA);
    return idA;
  }

  return idB;
}
/**
 * Used to generate an id, and after render, check if that id is rendered so we know
 * if we can use it in places such as labelledby.
 * @param depArray - When to recalculate if the id is in the DOM.
 */


exports.mergeIds = mergeIds;

function useSlotId(depArray) {
  if (depArray === void 0) {
    depArray = [];
  }

  let id = useId();
  let [resolvedId, setResolvedId] = useValueEffect(id);
  let updateId = useCallback(() => {
    setResolvedId(function* () {
      yield id;
      yield document.getElementById(id) ? id : null;
    });
  }, [id, setResolvedId]);
  useLayoutEffect(updateId, [id, updateId, ...depArray]);
  return resolvedId;
}

exports.useSlotId = useSlotId;

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

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
function chain() {
  for (var _len = arguments.length, callbacks = new Array(_len), _key = 0; _key < _len; _key++) {
    callbacks[_key] = arguments[_key];
  }

  return function () {
    for (let callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...arguments);
      }
    }
  };
}

exports.chain = chain;

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
function mergeProps() {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  let result = _babelRuntimeHelpersExtends({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (let i = 1; i < arguments.length; i++) {
    let props = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (let key in props) {
      let a = result[key];
      let b = props[key]; // Chain events

      if (typeof a === 'function' && typeof b === 'function' && // This is a lot faster than a regex.
      key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) >=
      /* 'A' */
      65 && key.charCodeAt(2) <=
      /* 'Z' */
      90) {
        result[key] = chain(a, b); // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if ((key === 'className' || key === 'UNSAFE_className') && typeof a === 'string' && typeof b === 'string') {
        result[key] = _clsx(a, b);
      } else if (key === 'id' && a && b) {
        result.id = mergeIds(a, b); // Override others
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result;
}

exports.mergeProps = mergeProps;
const $a736ffc3e05a0bfc1508098ba395b41$var$DOMPropNames = new Set(['id']);
const $a736ffc3e05a0bfc1508098ba395b41$var$labelablePropNames = new Set(['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-details']);
const $a736ffc3e05a0bfc1508098ba395b41$var$propRe = /^(data-.*)$/;
/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */

function filterDOMProps(props, opts) {
  if (opts === void 0) {
    opts = {};
  }

  let {
    labelable,
    propNames
  } = opts;
  let filteredProps = {};

  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && ($a736ffc3e05a0bfc1508098ba395b41$var$DOMPropNames.has(prop) || labelable && $a736ffc3e05a0bfc1508098ba395b41$var$labelablePropNames.has(prop) || propNames != null && propNames.has(prop) || $a736ffc3e05a0bfc1508098ba395b41$var$propRe.test(prop))) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}

exports.filterDOMProps = filterDOMProps;

// Currently necessary for Safari and old Edge:
// https://caniuse.com/#feat=mdn-api_htmlelement_focus_preventscroll_option
// See https://bugs.webkit.org/show_bug.cgi?id=178583
//
// Original licensing for the following methods can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/calvellido/focus-options-polyfill
function focusWithoutScrolling(element) {
  if ($d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScroll()) {
    element.focus({
      preventScroll: true
    });
  } else {
    let scrollableElements = $d2a175ba498dd7834499f256dfb330bc$var$getScrollableElements(element);
    element.focus();
    $d2a175ba498dd7834499f256dfb330bc$var$restoreScrollPosition(scrollableElements);
  }
}

exports.focusWithoutScrolling = focusWithoutScrolling;
let $d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScrollCached = null;

function $d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScroll() {
  if ($d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScrollCached == null) {
    $d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScrollCached = false;

    try {
      var focusElem = document.createElement('div');
      focusElem.focus({
        get preventScroll() {
          $d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScrollCached = true;
          return true;
        }

      });
    } catch (e) {// Ignore
    }
  }

  return $d2a175ba498dd7834499f256dfb330bc$var$supportsPreventScrollCached;
}

function $d2a175ba498dd7834499f256dfb330bc$var$getScrollableElements(element) {
  var parent = element.parentNode;
  var scrollableElements = [];
  var rootScrollingElement = document.scrollingElement || document.documentElement;

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }

    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }

  return scrollableElements;
}

function $d2a175ba498dd7834499f256dfb330bc$var$restoreScrollPosition(scrollableElements) {
  for (let {
    element,
    scrollTop,
    scrollLeft
  } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

function getOffset(element, reverse, orientation) {
  if (orientation === void 0) {
    orientation = 'horizontal';
  }

  let rect = element.getBoundingClientRect();

  if (reverse) {
    return orientation === 'horizontal' ? rect.right : rect.bottom;
  }

  return orientation === 'horizontal' ? rect.left : rect.top;
}

exports.getOffset = getOffset;
// mapped to a set of CSS properties that are transitioning for that element.
// This is necessary rather than a simple count of transitions because of browser
// bugs, e.g. Chrome sometimes fires both transitionend and transitioncancel rather
// than one or the other. So we need to track what's actually transitioning so that
// we can ignore these duplicate events.
let $a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement = new Map(); // A list of callbacks to call once there are no transitioning elements.

let $a39a8553a97349a69bcc0255658c67ab$var$transitionCallbacks = new Set();

function $a39a8553a97349a69bcc0255658c67ab$var$setupGlobalEvents() {
  if (typeof window === 'undefined') {
    return;
  }

  let onTransitionStart = e => {
    // Add the transitioning property to the list for this element.
    let transitions = $a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.get(e.target);

    if (!transitions) {
      transitions = new Set();
      $a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.set(e.target, transitions); // The transitioncancel event must be registered on the element itself, rather than as a global
      // event. This enables us to handle when the node is deleted from the document while it is transitioning.
      // In that case, the cancel event would have nowhere to bubble to so we need to handle it directly.

      e.target.addEventListener('transitioncancel', onTransitionEnd);
    }

    transitions.add(e.propertyName);
  };

  let onTransitionEnd = e => {
    // Remove property from list of transitioning properties.
    let properties = $a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.get(e.target);

    if (!properties) {
      return;
    }

    properties.delete(e.propertyName); // If empty, remove transitioncancel event, and remove the element from the list of transitioning elements.

    if (properties.size === 0) {
      e.target.removeEventListener('transitioncancel', onTransitionEnd);
      $a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.delete(e.target);
    } // If no transitioning elements, call all of the queued callbacks.


    if ($a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.size === 0) {
      for (let cb of $a39a8553a97349a69bcc0255658c67ab$var$transitionCallbacks) {
        cb();
      }

      $a39a8553a97349a69bcc0255658c67ab$var$transitionCallbacks.clear();
    }
  };

  document.body.addEventListener('transitionrun', onTransitionStart);
  document.body.addEventListener('transitionend', onTransitionEnd);
}

if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    $a39a8553a97349a69bcc0255658c67ab$var$setupGlobalEvents();
  } else {
    document.addEventListener('DOMContentLoaded', $a39a8553a97349a69bcc0255658c67ab$var$setupGlobalEvents);
  }
}

function runAfterTransition(fn) {
  // Wait one frame to see if an animation starts, e.g. a transition on mount.
  requestAnimationFrame(() => {
    // If no transitions are running, call the function immediately.
    // Otherwise, add it to a list of callbacks to run at the end of the animation.
    if ($a39a8553a97349a69bcc0255658c67ab$var$transitionsByElement.size === 0) {
      fn();
    } else {
      $a39a8553a97349a69bcc0255658c67ab$var$transitionCallbacks.add(fn);
    }
  });
}

exports.runAfterTransition = runAfterTransition;
// Keep track of elements that we are currently handling dragging for via useDrag1D.
// If there's an ancestor and a descendant both using useDrag1D(), and the user starts
// dragging the descendant, we don't want useDrag1D events to fire for the ancestor.
const $f9e3d2838685addd749dc9b533488cd5$var$draggingElements = []; // created for splitview, this should be reusable for things like sliders/dials
// It also handles keyboard events on the target allowing for increment/decrement by a given stepsize as well as minifying/maximizing and toggling between minified and previous size
// It can also take a 'reverse' param to say if we should measure from the right/bottom instead of the top/left
// It can also handle either a vertical or horizontal movement, but not both at the same time

function useDrag1D(props) {
  console.warn('useDrag1D is deprecated, please use `useMove` instead https://react-spectrum.adobe.com/react-aria/useMove.html');
  let {
    containerRef,
    reverse,
    orientation,
    onHover,
    onDrag,
    onPositionChange,
    onIncrement,
    onDecrement,
    onIncrementToMax,
    onDecrementToMin,
    onCollapseToggle
  } = props;

  let getPosition = e => orientation === 'horizontal' ? e.clientX : e.clientY;

  let getNextOffset = e => {
    let containerOffset = getOffset(containerRef.current, reverse, orientation);
    let mouseOffset = getPosition(e);
    let nextOffset = reverse ? containerOffset - mouseOffset : mouseOffset - containerOffset;
    return nextOffset;
  };

  let dragging = useRef(false);
  let prevPosition = useRef(0); // Keep track of the current handlers in a ref so that the events can access them.

  let handlers = useRef({
    onPositionChange,
    onDrag
  });
  handlers.current.onDrag = onDrag;
  handlers.current.onPositionChange = onPositionChange;

  let onMouseDragged = e => {
    e.preventDefault();
    let nextOffset = getNextOffset(e);

    if (!dragging.current) {
      dragging.current = true;

      if (handlers.current.onDrag) {
        handlers.current.onDrag(true);
      }

      if (handlers.current.onPositionChange) {
        handlers.current.onPositionChange(nextOffset);
      }
    }

    if (prevPosition.current === nextOffset) {
      return;
    }

    prevPosition.current = nextOffset;

    if (onPositionChange) {
      onPositionChange(nextOffset);
    }
  };

  let onMouseUp = e => {
    const target = e.target;
    dragging.current = false;
    let nextOffset = getNextOffset(e);

    if (handlers.current.onDrag) {
      handlers.current.onDrag(false);
    }

    if (handlers.current.onPositionChange) {
      handlers.current.onPositionChange(nextOffset);
    }

    $f9e3d2838685addd749dc9b533488cd5$var$draggingElements.splice($f9e3d2838685addd749dc9b533488cd5$var$draggingElements.indexOf(target), 1);
    window.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('mousemove', onMouseDragged, false);
  };

  let onMouseDown = e => {
    const target = e.currentTarget; // If we're already handling dragging on a descendant with useDrag1D, then
    // we don't want to handle the drag motion on this target as well.

    if ($f9e3d2838685addd749dc9b533488cd5$var$draggingElements.some(elt => target.contains(elt))) {
      return;
    }

    $f9e3d2838685addd749dc9b533488cd5$var$draggingElements.push(target);
    window.addEventListener('mousemove', onMouseDragged, false);
    window.addEventListener('mouseup', onMouseUp, false);
  };

  let onMouseEnter = () => {
    if (onHover) {
      onHover(true);
    }
  };

  let onMouseOut = () => {
    if (onHover) {
      onHover(false);
    }
  };

  let onKeyDown = e => {
    switch (e.key) {
      case 'Left':
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          e.preventDefault();

          if (onDecrement && !reverse) {
            onDecrement();
          } else if (onIncrement && reverse) {
            onIncrement();
          }
        }

        break;

      case 'Up':
      case 'ArrowUp':
        if (orientation === 'vertical') {
          e.preventDefault();

          if (onDecrement && !reverse) {
            onDecrement();
          } else if (onIncrement && reverse) {
            onIncrement();
          }
        }

        break;

      case 'Right':
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          e.preventDefault();

          if (onIncrement && !reverse) {
            onIncrement();
          } else if (onDecrement && reverse) {
            onDecrement();
          }
        }

        break;

      case 'Down':
      case 'ArrowDown':
        if (orientation === 'vertical') {
          e.preventDefault();

          if (onIncrement && !reverse) {
            onIncrement();
          } else if (onDecrement && reverse) {
            onDecrement();
          }
        }

        break;

      case 'Home':
        e.preventDefault();

        if (onDecrementToMin) {
          onDecrementToMin();
        }

        break;

      case 'End':
        e.preventDefault();

        if (onIncrementToMax) {
          onIncrementToMax();
        }

        break;

      case 'Enter':
        e.preventDefault();

        if (onCollapseToggle) {
          onCollapseToggle();
        }

        break;
    }
  };

  return {
    onMouseDown,
    onMouseEnter,
    onMouseOut,
    onKeyDown
  };
}

exports.useDrag1D = useDrag1D;

function useGlobalListeners() {
  let globalListeners = useRef(new Map());
  let addGlobalListener = useCallback((eventTarget, type, listener, options) => {
    // Make sure we remove the listener after it is called with the `once` option.
    let fn = options != null && options.once ? function () {
      globalListeners.current.delete(listener);
      listener(...arguments);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    });
    eventTarget.addEventListener(type, listener, options);
  }, []);
  let removeGlobalListener = useCallback((eventTarget, type, listener, options) => {
    var _globalListeners$curr;

    let fn = ((_globalListeners$curr = globalListeners.current.get(listener)) == null ? void 0 : _globalListeners$curr.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = useCallback(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [removeGlobalListener]); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    return removeAllGlobalListeners;
  }, [removeAllGlobalListeners]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}

exports.useGlobalListeners = useGlobalListeners;

/**
 * Merges aria-label and aria-labelledby into aria-labelledby when both exist.
 * @param props - Aria label props.
 * @param defaultLabel - Default value for aria-label when not present.
 */
function useLabels(props, defaultLabel) {
  let {
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy
  } = props; // If there is both an aria-label and aria-labelledby,
  // combine them by pointing to the element itself.

  id = useId(id);

  if (labelledBy && label) {
    let ids = new Set([...labelledBy.trim().split(/\s+/), id]);
    labelledBy = [...ids].join(' ');
  } else if (labelledBy) {
    labelledBy = labelledBy.trim().split(/\s+/).join(' ');
  } // If no labels are provided, use the default


  if (!label && !labelledBy && defaultLabel) {
    label = defaultLabel;
  }

  return {
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy
  };
}

exports.useLabels = useLabels;

/**
 * Offers an object ref for a given callback ref or an object ref. Especially
 * helfpul when passing forwarded refs (created using `React.forwardRef`) to
 * React Aria Hooks.
 *
 * @param forwardedRef The original ref intended to be used.
 * @returns An object ref that updates the given ref.
 * @see https://reactjs.org/docs/forwarding-refs.html
 */
function useObjectRef(forwardedRef) {
  const objRef = useRef();
  /**
   * We're using `useLayoutEffect` here instead of `useEffect` because we want
   * to make sure that the `ref` value is up to date before other places in the
   * the execution cycle try to read it.
   */

  useLayoutEffect(() => {
    if (!forwardedRef) {
      return;
    }

    if (typeof forwardedRef === 'function') {
      forwardedRef(objRef.current);
    } else {
      forwardedRef.current = objRef.current;
    }
  }, [forwardedRef]);
  return objRef;
}

exports.useObjectRef = useObjectRef;

// Like useEffect, but only called for updates after the initial render.
function useUpdateEffect(effect, dependencies) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, dependencies);
}

exports.useUpdateEffect = useUpdateEffect;

function $f58f1969071f2661185e38312efabfc$var$hasResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

function useResizeObserver(options) {
  const {
    ref,
    onResize
  } = options;
  useEffect(() => {
    let element = ref == null ? void 0 : ref.current;

    if (!element) {
      return;
    }

    if (!$f58f1969071f2661185e38312efabfc$var$hasResizeObserver()) {
      window.addEventListener('resize', onResize, false);
      return () => {
        window.removeEventListener('resize', onResize, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver(entries => {
        if (!entries.length) {
          return;
        }

        onResize();
      });
      resizeObserverInstance.observe(element);
      return () => {
        if (element) {
          resizeObserverInstance.unobserve(element);
        }
      };
    }
  }, [onResize, ref]);
}

exports.useResizeObserver = useResizeObserver;

// Syncs ref from context with ref passed to hook
function useSyncRef(context, ref) {
  useLayoutEffect(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        context.ref.current = null;
      };
    }
  }, [context, ref]);
}

exports.useSyncRef = useSyncRef;

function getScrollParent(node) {
  while (node && !$e9be933e81f272fbb0513fcc706c7$var$isScrollable(node)) {
    node = node.parentElement;
  }

  return node || document.scrollingElement || document.documentElement;
}

exports.getScrollParent = getScrollParent;

function $e9be933e81f272fbb0513fcc706c7$var$isScrollable(node) {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}

// @ts-ignore
let $f1a92c0e19f2e1ad09851454bf93009$var$visualViewport = typeof window !== 'undefined' && window.visualViewport;

function useViewportSize() {
  let [size, setSize] = useState(() => $f1a92c0e19f2e1ad09851454bf93009$var$getViewportSize());
  useEffect(() => {
    // Use visualViewport api to track available height even on iOS virtual keyboard opening
    let onResize = () => {
      setSize(size => {
        let newSize = $f1a92c0e19f2e1ad09851454bf93009$var$getViewportSize();

        if (newSize.width === size.width && newSize.height === size.height) {
          return size;
        }

        return newSize;
      });
    };

    if (!$f1a92c0e19f2e1ad09851454bf93009$var$visualViewport) {
      window.addEventListener('resize', onResize);
    } else {
      $f1a92c0e19f2e1ad09851454bf93009$var$visualViewport.addEventListener('resize', onResize);
    }

    return () => {
      if (!$f1a92c0e19f2e1ad09851454bf93009$var$visualViewport) {
        window.removeEventListener('resize', onResize);
      } else {
        $f1a92c0e19f2e1ad09851454bf93009$var$visualViewport.removeEventListener('resize', onResize);
      }
    };
  }, []);
  return size;
}

exports.useViewportSize = useViewportSize;

function $f1a92c0e19f2e1ad09851454bf93009$var$getViewportSize() {
  return {
    width: ($f1a92c0e19f2e1ad09851454bf93009$var$visualViewport == null ? void 0 : $f1a92c0e19f2e1ad09851454bf93009$var$visualViewport.width) || window.innerWidth,
    height: ($f1a92c0e19f2e1ad09851454bf93009$var$visualViewport == null ? void 0 : $f1a92c0e19f2e1ad09851454bf93009$var$visualViewport.height) || window.innerHeight
  };
}

let $bd5928122fc632cc7302c36df9f$var$descriptionId = 0;
const $bd5928122fc632cc7302c36df9f$var$descriptionNodes = new Map();

function useDescription(description) {
  let [id, setId] = useState(null);
  useLayoutEffect(() => {
    if (!description) {
      return;
    }

    let desc = $bd5928122fc632cc7302c36df9f$var$descriptionNodes.get(description);

    if (!desc) {
      let id = "react-aria-description-" + $bd5928122fc632cc7302c36df9f$var$descriptionId++;
      setId(id);
      let node = document.createElement('div');
      node.id = id;
      node.style.display = 'none';
      node.textContent = description;
      document.body.appendChild(node);
      desc = {
        refCount: 0,
        element: node
      };
      $bd5928122fc632cc7302c36df9f$var$descriptionNodes.set(description, desc);
    } else {
      setId(desc.element.id);
    }

    desc.refCount++;
    return () => {
      if (--desc.refCount === 0) {
        desc.element.remove();
        $bd5928122fc632cc7302c36df9f$var$descriptionNodes.delete(description);
      }
    };
  }, [description]);
  return {
    'aria-describedby': description ? id : undefined
  };
}

exports.useDescription = useDescription;

function $ffc9ede5fda79bf280c1bec834e32f$var$testUserAgent(re) {
  return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.userAgent) : false;
}

function $ffc9ede5fda79bf280c1bec834e32f$var$testPlatform(re) {
  return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.platform) : false;
}

function isMac() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testPlatform(/^Mac/);
}

exports.isMac = isMac;

function isIPhone() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testPlatform(/^iPhone/);
}

exports.isIPhone = isIPhone;

function isIPad() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}

exports.isIPad = isIPad;

function isIOS() {
  return isIPhone() || isIPad();
}

exports.isIOS = isIOS;

function isAppleDevice() {
  return isMac() || isIOS();
}

exports.isAppleDevice = isAppleDevice;

function isWebKit() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testUserAgent(/AppleWebKit/) && !isChrome();
}

exports.isWebKit = isWebKit;

function isChrome() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testUserAgent(/Chrome/);
}

exports.isChrome = isChrome;

function isAndroid() {
  return $ffc9ede5fda79bf280c1bec834e32f$var$testUserAgent(/Android/);
}

exports.isAndroid = isAndroid;

function useEvent(ref, event, handler, options) {
  let handlerRef = useRef(handler);
  handlerRef.current = handler;
  let isDisabled = handler == null;
  useEffect(() => {
    if (isDisabled) {
      return;
    }

    let element = ref.current;

    let handler = e => handlerRef.current.call(this, e);

    element.addEventListener(event, handler, options);
    return () => {
      element.removeEventListener(event, handler, options);
    };
  }, [ref, event, options, isDisabled]);
}

exports.useEvent = useEvent;

// This hook works like `useState`, but when setting the value, you pass a generator function
// that can yield multiple values. Each yielded value updates the state and waits for the next
// layout effect, then continues the generator. This allows sequential updates to state to be
// written linearly.
function useValueEffect(defaultValue) {
  let [value, setValue] = useState(defaultValue);
  let valueRef = useRef(value);
  let effect = useRef(null);
  valueRef.current = value; // Store the function in a ref so we can always access the current version
  // which has the proper `value` in scope.

  let nextRef = useRef(null);

  nextRef.current = () => {
    // Run the generator to the next yield.
    let newValue = effect.current.next(); // If the generator is done, reset the effect.

    if (newValue.done) {
      effect.current = null;
      return;
    } // If the value is the same as the current value,
    // then continue to the next yield. Otherwise,
    // set the value in state and wait for the next layout effect.


    if (value === newValue.value) {
      nextRef.current();
    } else {
      setValue(newValue.value);
    }
  };

  useLayoutEffect(() => {
    // If there is an effect currently running, continue to the next yield.
    if (effect.current) {
      nextRef.current();
    }
  });
  let queue = useCallback(fn => {
    effect.current = fn(valueRef.current);
    nextRef.current();
  }, [effect, nextRef]);
  return [value, queue];
}

exports.useValueEffect = useValueEffect;

function scrollIntoView(scrollView, element) {
  let offsetX = $cbd55f9ce27bf074ec65b15e6f24531$var$relativeOffset(scrollView, element, 'left');
  let offsetY = $cbd55f9ce27bf074ec65b15e6f24531$var$relativeOffset(scrollView, element, 'top');
  let width = element.offsetWidth;
  let height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  let maxX = x + scrollView.offsetWidth;
  let maxY = y + scrollView.offsetHeight;

  if (offsetX <= x) {
    x = offsetX;
  } else if (offsetX + width > maxX) {
    x += offsetX + width - maxX;
  }

  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }

  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
/**
 * Computes the offset left or top from child to ancestor by accumulating
 * offsetLeft or offsetTop through intervening offsetParents.
 */


exports.scrollIntoView = scrollIntoView;

function $cbd55f9ce27bf074ec65b15e6f24531$var$relativeOffset(ancestor, child, axis) {
  const prop = axis === 'left' ? 'offsetLeft' : 'offsetTop';
  let sum = 0;

  while (child.offsetParent) {
    sum += child[prop];

    if (child.offsetParent === ancestor) {
      // Stop once we have found the ancestor we are interested in.
      break;
    } else if (child.offsetParent.contains(ancestor)) {
      // If the ancestor is not `position:relative`, then we stop at
      // _its_ offset parent, and we subtract off _its_ offset, so that
      // we end up with the proper offset from child to ancestor.
      sum -= ancestor[prop];
      break;
    }

    child = child.offsetParent;
  }

  return sum;
}
//# sourceMappingURL=main.js.map
