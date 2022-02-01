var _babelRuntimeHelpersObjectWithoutPropertiesLoose = $parcel$interopDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _clsx = $parcel$interopDefault(require("clsx"));

var _babelRuntimeHelpersExtends = $parcel$interopDefault(require("@babel/runtime/helpers/extends"));

var _react2 = require("react");

var _react = $parcel$interopDefault(_react2);

var {
  useContext,
  useEffect,
  useRef,
  useState
} = _react2;

var {
  getInteractionModality,
  isFocusVisible: _isFocusVisible,
  useFocus,
  useFocusVisibleListener,
  useFocusWithin,
  useKeyboard
} = require("@react-aria/interactions");

var {
  focusWithoutScrolling,
  runAfterTransition,
  useLayoutEffect,
  mergeProps,
  useSyncRef
} = require("@react-aria/utils");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

/**
 * A utility function that focuses an element while avoiding undesired side effects such
 * as page scrolling and screen reader issues with CSS transitions.
 */
function focusSafely(element) {
  // If the user is interacting with a virtual cursor, e.g. screen reader, then
  // wait until after any animated transitions that are currently occurring on
  // the page before shifting focus. This avoids issues with VoiceOver on iOS
  // causing the page to scroll when moving focus if the element is transitioning
  // from off the screen.
  if (getInteractionModality() === 'virtual') {
    let lastFocusedElement = document.activeElement;
    runAfterTransition(() => {
      // If focus did not move and the element is still in the document, focus it.
      if (document.activeElement === lastFocusedElement && document.contains(element)) {
        focusWithoutScrolling(element);
      }
    });
  } else {
    focusWithoutScrolling(element);
  }
}

exports.focusSafely = focusSafely;

/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $f5b8109741a107bfe8bf4093e29$var$isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }

  let {
    display,
    visibility
  } = element.style;
  let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';

  if (isVisible) {
    const {
      getComputedStyle
    } = element.ownerDocument.defaultView;
    let {
      display: computedDisplay,
      visibility: computedVisibility
    } = getComputedStyle(element);
    isVisible = computedDisplay !== 'none' && computedVisibility !== 'hidden' && computedVisibility !== 'collapse';
  }

  return isVisible;
}

function $f5b8109741a107bfe8bf4093e29$var$isAttributeVisible(element, childElement) {
  return !element.hasAttribute('hidden') && (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY' ? element.hasAttribute('open') : true);
}
/**
 * Adapted from https://github.com/testing-library/jest-dom and 
 * https://github.com/vuejs/vue-test-utils-next/.
 * Licensed under the MIT License.
 * @param element - Element to evaluate for display or visibility.
 */


function $f5b8109741a107bfe8bf4093e29$export$isElementVisible(element, childElement) {
  return element.nodeName !== '#comment' && $f5b8109741a107bfe8bf4093e29$var$isStyleVisible(element) && $f5b8109741a107bfe8bf4093e29$var$isAttributeVisible(element, childElement) && (!element.parentElement || $f5b8109741a107bfe8bf4093e29$export$isElementVisible(element.parentElement, element));
}

const $bdceb2956edbee43435a9382ef97283f$var$FocusContext = /*#__PURE__*/_react.createContext(null);

let $bdceb2956edbee43435a9382ef97283f$var$activeScope = null;
let $bdceb2956edbee43435a9382ef97283f$var$scopes = new Map(); // This is a hacky DOM-based implementation of a FocusScope until this RFC lands in React:
// https://github.com/reactjs/rfcs/pull/109
// For now, it relies on the DOM tree order rather than the React tree order, and is probably
// less optimized for performance.

/**
 * A FocusScope manages focus for its descendants. It supports containing focus inside
 * the scope, restoring focus to the previously focused element on unmount, and auto
 * focusing children on mount. It also acts as a container for a programmatic focus
 * management interface that can be used to move focus forward and back in response
 * to user events.
 */

function FocusScope(props) {
  let {
    children,
    contain,
    restoreFocus,
    autoFocus
  } = props;
  let startRef = useRef();
  let endRef = useRef();
  let scopeRef = useRef([]);
  let ctx = useContext($bdceb2956edbee43435a9382ef97283f$var$FocusContext);
  let parentScope = ctx == null ? void 0 : ctx.scopeRef;
  useLayoutEffect(() => {
    // Find all rendered nodes between the sentinels and add them to the scope.
    let node = startRef.current.nextSibling;
    let nodes = [];

    while (node && node !== endRef.current) {
      nodes.push(node);
      node = node.nextSibling;
    }

    scopeRef.current = nodes;
  }, [children, parentScope]);
  useLayoutEffect(() => {
    $bdceb2956edbee43435a9382ef97283f$var$scopes.set(scopeRef, parentScope);
    return () => {
      // Restore the active scope on unmount if this scope or a descendant scope is active.
      // Parent effect cleanups run before children, so we need to check if the
      // parent scope actually still exists before restoring the active scope to it.
      if ((scopeRef === $bdceb2956edbee43435a9382ef97283f$var$activeScope || $bdceb2956edbee43435a9382ef97283f$var$isAncestorScope(scopeRef, $bdceb2956edbee43435a9382ef97283f$var$activeScope)) && (!parentScope || $bdceb2956edbee43435a9382ef97283f$var$scopes.has(parentScope))) {
        $bdceb2956edbee43435a9382ef97283f$var$activeScope = parentScope;
      }

      $bdceb2956edbee43435a9382ef97283f$var$scopes.delete(scopeRef);
    };
  }, [scopeRef, parentScope]);
  $bdceb2956edbee43435a9382ef97283f$var$useFocusContainment(scopeRef, contain);
  $bdceb2956edbee43435a9382ef97283f$var$useRestoreFocus(scopeRef, restoreFocus, contain);
  $bdceb2956edbee43435a9382ef97283f$var$useAutoFocus(scopeRef, autoFocus);
  let focusManager = $bdceb2956edbee43435a9382ef97283f$var$createFocusManagerForScope(scopeRef);
  return /*#__PURE__*/_react.createElement($bdceb2956edbee43435a9382ef97283f$var$FocusContext.Provider, {
    value: {
      scopeRef,
      focusManager
    }
  }, /*#__PURE__*/_react.createElement("span", {
    "data-focus-scope-start": true,
    hidden: true,
    ref: startRef
  }), children, /*#__PURE__*/_react.createElement("span", {
    "data-focus-scope-end": true,
    hidden: true,
    ref: endRef
  }));
}
/**
 * Returns a FocusManager interface for the parent FocusScope.
 * A FocusManager can be used to programmatically move focus within
 * a FocusScope, e.g. in response to user events like keyboard navigation.
 */


exports.FocusScope = FocusScope;

function useFocusManager() {
  var _useContext;

  return (_useContext = useContext($bdceb2956edbee43435a9382ef97283f$var$FocusContext)) == null ? void 0 : _useContext.focusManager;
}

exports.useFocusManager = useFocusManager;

function $bdceb2956edbee43435a9382ef97283f$var$createFocusManagerForScope(scopeRef) {
  return {
    focusNext(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let scope = scopeRef.current;
      let {
        from,
        tabbable,
        wrap
      } = opts;
      let node = from || document.activeElement;
      let sentinel = scope[0].previousElementSibling;
      let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
        tabbable
      }, scope);
      walker.currentNode = $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(node, scope) ? node : sentinel;
      let nextNode = walker.nextNode();

      if (!nextNode && wrap) {
        walker.currentNode = sentinel;
        nextNode = walker.nextNode();
      }

      if (nextNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextNode, true);
      }

      return nextNode;
    },

    focusPrevious(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let scope = scopeRef.current;
      let {
        from,
        tabbable,
        wrap
      } = opts;
      let node = from || document.activeElement;
      let sentinel = scope[scope.length - 1].nextElementSibling;
      let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
        tabbable
      }, scope);
      walker.currentNode = $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(node, scope) ? node : sentinel;
      let previousNode = walker.previousNode();

      if (!previousNode && wrap) {
        walker.currentNode = sentinel;
        previousNode = walker.previousNode();
      }

      if (previousNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(previousNode, true);
      }

      return previousNode;
    },

    focusFirst(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let scope = scopeRef.current;
      let {
        tabbable
      } = opts;
      let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
        tabbable
      }, scope);
      walker.currentNode = scope[0].previousElementSibling;
      let nextNode = walker.nextNode();

      if (nextNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextNode, true);
      }

      return nextNode;
    },

    focusLast(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let scope = scopeRef.current;
      let {
        tabbable
      } = opts;
      let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
        tabbable
      }, scope);
      walker.currentNode = scope[scope.length - 1].nextElementSibling;
      let previousNode = walker.previousNode();

      if (previousNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(previousNode, true);
      }

      return previousNode;
    }

  };
}

const $bdceb2956edbee43435a9382ef97283f$var$focusableElements = ['input:not([disabled]):not([type=hidden])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'a[href]', 'area[href]', 'summary', 'iframe', 'object', 'embed', 'audio[controls]', 'video[controls]', '[contenteditable]'];
const $bdceb2956edbee43435a9382ef97283f$var$FOCUSABLE_ELEMENT_SELECTOR = $bdceb2956edbee43435a9382ef97283f$var$focusableElements.join(':not([hidden]),') + ',[tabindex]:not([disabled]):not([hidden])';
$bdceb2956edbee43435a9382ef97283f$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const $bdceb2956edbee43435a9382ef97283f$var$TABBABLE_ELEMENT_SELECTOR = $bdceb2956edbee43435a9382ef97283f$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');

function $bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope) {
  return scope[0].parentElement;
}

function $bdceb2956edbee43435a9382ef97283f$var$useFocusContainment(scopeRef, contain) {
  let focusedNode = useRef();
  let raf = useRef(null);
  useLayoutEffect(() => {
    let scope = scopeRef.current;

    if (!contain) {
      return;
    } // Handle the Tab key to contain focus within the scope


    let onKeyDown = e => {
      if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey || scopeRef !== $bdceb2956edbee43435a9382ef97283f$var$activeScope) {
        return;
      }

      let focusedElement = document.activeElement;
      let scope = scopeRef.current;

      if (!$bdceb2956edbee43435a9382ef97283f$var$isElementInScope(focusedElement, scope)) {
        return;
      }

      let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
        tabbable: true
      }, scope);
      walker.currentNode = focusedElement;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();

      if (!nextElement) {
        walker.currentNode = e.shiftKey ? scope[scope.length - 1].nextElementSibling : scope[0].previousElementSibling;
        nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      }

      e.preventDefault();

      if (nextElement) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextElement, true);
      }
    };

    let onFocus = e => {
      // If focusing an element in a child scope of the currently active scope, the child becomes active.
      // Moving out of the active scope to an ancestor is not allowed.
      if (!$bdceb2956edbee43435a9382ef97283f$var$activeScope || $bdceb2956edbee43435a9382ef97283f$var$isAncestorScope($bdceb2956edbee43435a9382ef97283f$var$activeScope, scopeRef)) {
        $bdceb2956edbee43435a9382ef97283f$var$activeScope = scopeRef;
        focusedNode.current = e.target;
      } else if (scopeRef === $bdceb2956edbee43435a9382ef97283f$var$activeScope && !$bdceb2956edbee43435a9382ef97283f$var$isElementInChildScope(e.target, scopeRef)) {
        // If a focus event occurs outside the active scope (e.g. user tabs from browser location bar),
        // restore focus to the previously focused node or the first tabbable element in the active scope.
        if (focusedNode.current) {
          focusedNode.current.focus();
        } else if ($bdceb2956edbee43435a9382ef97283f$var$activeScope) {
          $bdceb2956edbee43435a9382ef97283f$var$focusFirstInScope($bdceb2956edbee43435a9382ef97283f$var$activeScope.current);
        }
      } else if (scopeRef === $bdceb2956edbee43435a9382ef97283f$var$activeScope) {
        focusedNode.current = e.target;
      }
    };

    let onBlur = e => {
      // Firefox doesn't shift focus back to the Dialog properly without this
      raf.current = requestAnimationFrame(() => {
        // Use document.activeElement instead of e.relatedTarget so we can tell if user clicked into iframe
        if (scopeRef === $bdceb2956edbee43435a9382ef97283f$var$activeScope && !$bdceb2956edbee43435a9382ef97283f$var$isElementInChildScope(document.activeElement, scopeRef)) {
          $bdceb2956edbee43435a9382ef97283f$var$activeScope = scopeRef;
          focusedNode.current = e.target;
          focusedNode.current.focus();
        }
      });
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('focusin', onFocus, false);
    scope.forEach(element => element.addEventListener('focusin', onFocus, false));
    scope.forEach(element => element.addEventListener('focusout', onBlur, false));
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('focusin', onFocus, false);
      scope.forEach(element => element.removeEventListener('focusin', onFocus, false));
      scope.forEach(element => element.removeEventListener('focusout', onBlur, false));
    };
  }, [scopeRef, contain]); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, [raf]);
}

function $bdceb2956edbee43435a9382ef97283f$var$isElementInAnyScope(element) {
  for (let scope of $bdceb2956edbee43435a9382ef97283f$var$scopes.keys()) {
    if ($bdceb2956edbee43435a9382ef97283f$var$isElementInScope(element, scope.current)) {
      return true;
    }
  }

  return false;
}

function $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(element, scope) {
  return scope.some(node => node.contains(element));
}

function $bdceb2956edbee43435a9382ef97283f$var$isElementInChildScope(element, scope) {
  // node.contains in isElementInScope covers child scopes that are also DOM children,
  // but does not cover child scopes in portals.
  for (let s of $bdceb2956edbee43435a9382ef97283f$var$scopes.keys()) {
    if ((s === scope || $bdceb2956edbee43435a9382ef97283f$var$isAncestorScope(scope, s)) && $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(element, s.current)) {
      return true;
    }
  }

  return false;
}

function $bdceb2956edbee43435a9382ef97283f$var$isAncestorScope(ancestor, scope) {
  let parent = $bdceb2956edbee43435a9382ef97283f$var$scopes.get(scope);

  if (!parent) {
    return false;
  }

  if (parent === ancestor) {
    return true;
  }

  return $bdceb2956edbee43435a9382ef97283f$var$isAncestorScope(ancestor, parent);
}

function $bdceb2956edbee43435a9382ef97283f$var$focusElement(element, scroll) {
  if (scroll === void 0) {
    scroll = false;
  }

  if (element != null && !scroll) {
    try {
      focusSafely(element);
    } catch (err) {// ignore
    }
  } else if (element != null) {
    try {
      element.focus();
    } catch (err) {// ignore
    }
  }
}

function $bdceb2956edbee43435a9382ef97283f$var$focusFirstInScope(scope) {
  let sentinel = scope[0].previousElementSibling;
  let walker = getFocusableTreeWalker($bdceb2956edbee43435a9382ef97283f$var$getScopeRoot(scope), {
    tabbable: true
  }, scope);
  walker.currentNode = sentinel;
  $bdceb2956edbee43435a9382ef97283f$var$focusElement(walker.nextNode());
}

function $bdceb2956edbee43435a9382ef97283f$var$useAutoFocus(scopeRef, autoFocus) {
  const autoFocusRef = _react.useRef(autoFocus);

  useEffect(() => {
    if (autoFocusRef.current) {
      $bdceb2956edbee43435a9382ef97283f$var$activeScope = scopeRef;

      if (!$bdceb2956edbee43435a9382ef97283f$var$isElementInScope(document.activeElement, $bdceb2956edbee43435a9382ef97283f$var$activeScope.current)) {
        $bdceb2956edbee43435a9382ef97283f$var$focusFirstInScope(scopeRef.current);
      }
    }

    autoFocusRef.current = false;
  }, []);
}

function $bdceb2956edbee43435a9382ef97283f$var$useRestoreFocus(scopeRef, restoreFocus, contain) {
  // useLayoutEffect instead of useEffect so the active element is saved synchronously instead of asynchronously.
  useLayoutEffect(() => {
    if (!restoreFocus) {
      return;
    }

    let scope = scopeRef.current;
    let nodeToRestore = document.activeElement; // Handle the Tab key so that tabbing out of the scope goes to the next element
    // after the node that had focus when the scope mounted. This is important when
    // using portals for overlays, so that focus goes to the expected element when
    // tabbing out of the overlay.

    let onKeyDown = e => {
      if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      let focusedElement = document.activeElement;

      if (!$bdceb2956edbee43435a9382ef97283f$var$isElementInScope(focusedElement, scope)) {
        return;
      } // Create a DOM tree walker that matches all tabbable elements


      let walker = getFocusableTreeWalker(document.body, {
        tabbable: true
      }); // Find the next tabbable element after the currently focused element

      walker.currentNode = focusedElement;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();

      if (!document.body.contains(nodeToRestore) || nodeToRestore === document.body) {
        nodeToRestore = null;
      } // If there is no next element, or it is outside the current scope, move focus to the
      // next element after the node to restore to instead.


      if ((!nextElement || !$bdceb2956edbee43435a9382ef97283f$var$isElementInScope(nextElement, scope)) && nodeToRestore) {
        walker.currentNode = nodeToRestore; // Skip over elements within the scope, in case the scope immediately follows the node to restore.

        do {
          nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
        } while ($bdceb2956edbee43435a9382ef97283f$var$isElementInScope(nextElement, scope));

        e.preventDefault();
        e.stopPropagation();

        if (nextElement) {
          $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextElement, true);
        } else {
          // If there is no next element and the nodeToRestore isn't within a FocusScope (i.e. we are leaving the top level focus scope)
          // then move focus to the body.
          // Otherwise restore focus to the nodeToRestore (e.g menu within a popover -> tabbing to close the menu should move focus to menu trigger)
          if (!$bdceb2956edbee43435a9382ef97283f$var$isElementInAnyScope(nodeToRestore)) {
            focusedElement.blur();
          } else {
            $bdceb2956edbee43435a9382ef97283f$var$focusElement(nodeToRestore, true);
          }
        }
      }
    };

    if (!contain) {
      document.addEventListener('keydown', onKeyDown, true);
    }

    return () => {
      if (!contain) {
        document.removeEventListener('keydown', onKeyDown, true);
      }

      if (restoreFocus && nodeToRestore && $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(document.activeElement, scope)) {
        requestAnimationFrame(() => {
          if (document.body.contains(nodeToRestore)) {
            $bdceb2956edbee43435a9382ef97283f$var$focusElement(nodeToRestore);
          }
        });
      }
    };
  }, [scopeRef, restoreFocus, contain]);
}
/**
 * Create a [TreeWalker]{@link https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker}
 * that matches all focusable/tabbable elements.
 */


function getFocusableTreeWalker(root, opts, scope) {
  let selector = opts != null && opts.tabbable ? $bdceb2956edbee43435a9382ef97283f$var$TABBABLE_ELEMENT_SELECTOR : $bdceb2956edbee43435a9382ef97283f$var$FOCUSABLE_ELEMENT_SELECTOR;
  let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      var _opts$from;

      // Skip nodes inside the starting node.
      if (opts != null && (_opts$from = opts.from) != null && _opts$from.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (node.matches(selector) && $f5b8109741a107bfe8bf4093e29$export$isElementVisible(node) && (!scope || $bdceb2956edbee43435a9382ef97283f$var$isElementInScope(node, scope))) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    }

  });

  if (opts != null && opts.from) {
    walker.currentNode = opts.from;
  }

  return walker;
}
/**
 * Creates a FocusManager object that can be used to move focus within an element.
 */


exports.getFocusableTreeWalker = getFocusableTreeWalker;

function createFocusManager(ref) {
  return {
    focusNext(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let root = ref.current;
      let {
        from,
        tabbable,
        wrap
      } = opts;
      let node = from || document.activeElement;
      let walker = getFocusableTreeWalker(root, {
        tabbable
      });

      if (root.contains(node)) {
        walker.currentNode = node;
      }

      let nextNode = walker.nextNode();

      if (!nextNode && wrap) {
        walker.currentNode = root;
        nextNode = walker.nextNode();
      }

      if (nextNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextNode, true);
      }

      return nextNode;
    },

    focusPrevious(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let root = ref.current;
      let {
        from,
        tabbable,
        wrap
      } = opts;
      let node = from || document.activeElement;
      let walker = getFocusableTreeWalker(root, {
        tabbable
      });

      if (root.contains(node)) {
        walker.currentNode = node;
      } else {
        let next = $bdceb2956edbee43435a9382ef97283f$var$last(walker);

        if (next) {
          $bdceb2956edbee43435a9382ef97283f$var$focusElement(next, true);
        }

        return next;
      }

      let previousNode = walker.previousNode();

      if (!previousNode && wrap) {
        walker.currentNode = root;
        previousNode = $bdceb2956edbee43435a9382ef97283f$var$last(walker);
      }

      if (previousNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(previousNode, true);
      }

      return previousNode;
    },

    focusFirst(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let root = ref.current;
      let {
        tabbable
      } = opts;
      let walker = getFocusableTreeWalker(root, {
        tabbable
      });
      let nextNode = walker.nextNode();

      if (nextNode) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(nextNode, true);
      }

      return nextNode;
    },

    focusLast(opts) {
      if (opts === void 0) {
        opts = {};
      }

      let root = ref.current;
      let {
        tabbable
      } = opts;
      let walker = getFocusableTreeWalker(root, {
        tabbable
      });
      let next = $bdceb2956edbee43435a9382ef97283f$var$last(walker);

      if (next) {
        $bdceb2956edbee43435a9382ef97283f$var$focusElement(next, true);
      }

      return next;
    }

  };
}

exports.createFocusManager = createFocusManager;

function $bdceb2956edbee43435a9382ef97283f$var$last(walker) {
  let next;
  let last;

  do {
    last = walker.lastChild();

    if (last) {
      next = last;
    }
  } while (last);

  return next;
}

/**
 * Determines whether a focus ring should be shown to indicate keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
function useFocusRing(props) {
  if (props === void 0) {
    props = {};
  }

  let {
    autoFocus = false,
    isTextInput,
    within
  } = props;
  let state = useRef({
    isFocused: false,
    isFocusVisible: autoFocus || _isFocusVisible()
  }).current;
  let [isFocused, setFocused] = useState(false);
  let [isFocusVisibleState, setFocusVisible] = useState(() => state.isFocused && state.isFocusVisible);

  let updateState = () => setFocusVisible(state.isFocused && state.isFocusVisible);

  let onFocusChange = isFocused => {
    state.isFocused = isFocused;
    setFocused(isFocused);
    updateState();
  };

  useFocusVisibleListener(isFocusVisible => {
    state.isFocusVisible = isFocusVisible;
    updateState();
  }, [], {
    isTextInput
  });
  let {
    focusProps
  } = useFocus({
    isDisabled: within,
    onFocusChange
  });
  let {
    focusWithinProps
  } = useFocusWithin({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange
  });
  return {
    isFocused,
    isFocusVisible: state.isFocused && isFocusVisibleState,
    focusProps: within ? focusWithinProps : focusProps
  };
}

exports.useFocusRing = useFocusRing;

/**
 * A utility component that applies a CSS class when an element has keyboard focus.
 * Focus rings are visible only when the user is interacting with a keyboard,
 * not with a mouse, touch, or other input methods.
 */
function FocusRing(props) {
  let {
    children,
    focusClass,
    focusRingClass
  } = props;
  let {
    isFocused,
    isFocusVisible,
    focusProps
  } = useFocusRing(props);

  let child = _react.Children.only(children);

  return /*#__PURE__*/_react.cloneElement(child, mergeProps(child.props, _babelRuntimeHelpersExtends({}, focusProps, {
    className: _clsx({
      [focusClass || '']: isFocused,
      [focusRingClass || '']: isFocusVisible
    })
  })));
}

exports.FocusRing = FocusRing;

let $f284cbc8bcdf616ffabe3d006e2c9db$var$FocusableContext = /*#__PURE__*/_react.createContext(null);

function $f284cbc8bcdf616ffabe3d006e2c9db$var$useFocusableContext(ref) {
  let context = useContext($f284cbc8bcdf616ffabe3d006e2c9db$var$FocusableContext) || {};
  useSyncRef(context, ref); // eslint-disable-next-line

  let otherProps = _babelRuntimeHelpersObjectWithoutPropertiesLoose(context, ["ref"]);

  return otherProps;
}
/**
 * Provides DOM props to the nearest focusable child.
 */


function $f284cbc8bcdf616ffabe3d006e2c9db$var$FocusableProvider(props, ref) {
  let {
    children
  } = props,
      otherProps = _babelRuntimeHelpersObjectWithoutPropertiesLoose(props, ["children"]);

  let context = _babelRuntimeHelpersExtends({}, otherProps, {
    ref
  });

  return /*#__PURE__*/_react.createElement($f284cbc8bcdf616ffabe3d006e2c9db$var$FocusableContext.Provider, {
    value: context
  }, children);
}

let FocusableProvider = /*#__PURE__*/_react.forwardRef($f284cbc8bcdf616ffabe3d006e2c9db$var$FocusableProvider);

exports.FocusableProvider = FocusableProvider;

/**
 * Used to make an element focusable and capable of auto focus.
 */
function useFocusable(props, domRef) {
  let {
    focusProps
  } = useFocus(props);
  let {
    keyboardProps
  } = useKeyboard(props);
  let interactions = mergeProps(focusProps, keyboardProps);
  let domProps = $f284cbc8bcdf616ffabe3d006e2c9db$var$useFocusableContext(domRef);
  let interactionProps = props.isDisabled ? {} : domProps;
  let autoFocusRef = useRef(props.autoFocus);
  useEffect(() => {
    if (autoFocusRef.current && domRef.current) {
      domRef.current.focus();
    }

    autoFocusRef.current = false;
  }, []);
  return {
    focusableProps: mergeProps(_babelRuntimeHelpersExtends({}, interactions, {
      tabIndex: props.excludeFromTabOrder && !props.isDisabled ? -1 : undefined
    }), interactionProps)
  };
}

exports.useFocusable = useFocusable;
//# sourceMappingURL=main.js.map
