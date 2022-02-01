import { useCallback, useEffect, useRef, useState } from 'react';
import useDebouncedCallback from './useDebouncedCallback';
function valueEquality(left, right) {
    return left === right;
}
export default function useDebounce(value, delay, options) {
    var eq = options && options.equalityFn ? options.equalityFn : valueEquality;
    var _a = useState(value), state = _a[0], dispatch = _a[1];
    var _b = useDebouncedCallback(useCallback(function (value) { return dispatch(value); }, []), delay, options), callback = _b[0], cancel = _b[1], callPending = _b[2];
    var previousValue = useRef(value);
    useEffect(function () {
        // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
        if (!eq(previousValue.current, value)) {
            callback(value);
            previousValue.current = value;
        }
    }, [value, callback, eq]);
    return [state, cancel, callPending];
}
