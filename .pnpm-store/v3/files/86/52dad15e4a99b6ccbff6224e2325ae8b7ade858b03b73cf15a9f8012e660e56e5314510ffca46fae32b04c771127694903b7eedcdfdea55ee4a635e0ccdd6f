"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useDebouncedCallback(callback, delay, options) {
    if (options === void 0) { options = {}; }
    var maxWait = options.maxWait;
    var maxWaitHandler = react_1.useRef(null);
    var maxWaitArgs = react_1.useRef([]);
    var leading = options.leading;
    var trailing = options.trailing === undefined ? true : options.trailing;
    var leadingCall = react_1.useRef(false);
    var functionTimeoutHandler = react_1.useRef(null);
    var isComponentUnmounted = react_1.useRef(false);
    var debouncedFunction = react_1.useRef(callback);
    debouncedFunction.current = callback;
    var cancelDebouncedCallback = react_1.useCallback(function () {
        clearTimeout(functionTimeoutHandler.current);
        clearTimeout(maxWaitHandler.current);
        maxWaitHandler.current = null;
        maxWaitArgs.current = [];
        functionTimeoutHandler.current = null;
        leadingCall.current = false;
    }, []);
    react_1.useEffect(function () {
        // We have to set isComponentUnmounted to be truth, as fast-refresh runs all useEffects
        isComponentUnmounted.current = false;
        return function () {
            // we use flag, as we allow to call callPending outside the hook
            isComponentUnmounted.current = true;
        };
    }, []);
    var debouncedCallback = react_1.useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        maxWaitArgs.current = args;
        clearTimeout(functionTimeoutHandler.current);
        if (leadingCall.current) {
            leadingCall.current = false;
        }
        if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
            debouncedFunction.current.apply(debouncedFunction, args);
            leadingCall.current = true;
        }
        functionTimeoutHandler.current = setTimeout(function () {
            var shouldCallFunction = true;
            if (leading && leadingCall.current) {
                shouldCallFunction = false;
            }
            cancelDebouncedCallback();
            if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
                debouncedFunction.current.apply(debouncedFunction, args);
            }
        }, delay);
        if (maxWait && !maxWaitHandler.current && trailing) {
            maxWaitHandler.current = setTimeout(function () {
                var args = maxWaitArgs.current;
                cancelDebouncedCallback();
                if (!isComponentUnmounted.current) {
                    debouncedFunction.current.apply(null, args);
                }
            }, maxWait);
        }
    }, [maxWait, delay, cancelDebouncedCallback, leading, trailing]);
    var callPending = react_1.useCallback(function () {
        // Call pending callback only if we have anything in our queue
        if (!functionTimeoutHandler.current) {
            return;
        }
        debouncedFunction.current.apply(null, maxWaitArgs.current);
        cancelDebouncedCallback();
    }, [cancelDebouncedCallback]);
    // At the moment, we use 3 args array so that we save backward compatibility
    return [debouncedCallback, cancelDebouncedCallback, callPending];
}
exports.default = useDebouncedCallback;
