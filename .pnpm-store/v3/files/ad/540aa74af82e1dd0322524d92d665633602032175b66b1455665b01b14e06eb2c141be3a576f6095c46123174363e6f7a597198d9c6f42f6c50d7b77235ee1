"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDebouncedCallback_1 = require("./useDebouncedCallback");
function valueEquality(left, right) {
    return left === right;
}
function useDebounce(value, delay, options) {
    var eq = options && options.equalityFn ? options.equalityFn : valueEquality;
    var _a = react_1.useState(value), state = _a[0], dispatch = _a[1];
    var _b = useDebouncedCallback_1.default(react_1.useCallback(function (value) { return dispatch(value); }, []), delay, options), callback = _b[0], cancel = _b[1], callPending = _b[2];
    var previousValue = react_1.useRef(value);
    react_1.useEffect(function () {
        // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
        if (!eq(previousValue.current, value)) {
            callback(value);
            previousValue.current = value;
        }
    }, [value, callback, eq]);
    return [state, cancel, callPending];
}
exports.default = useDebounce;
