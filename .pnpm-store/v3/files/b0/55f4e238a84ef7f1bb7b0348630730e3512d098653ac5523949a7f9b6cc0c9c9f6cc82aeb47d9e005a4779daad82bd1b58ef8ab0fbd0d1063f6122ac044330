import { useCallback, useRef, useState } from "react";
export function useControlledState(value, defaultValue, onChange) {
  let [stateValue, setStateValue] = useState(value || defaultValue);
  let ref = useRef(value !== undefined);
  let wasControlled = ref.current;
  let isControlled = value !== undefined; // Internal state reference for useCallback

  let stateRef = useRef(stateValue);

  if (wasControlled !== isControlled) {
    console.warn("WARN: A component changed from " + (wasControlled ? 'controlled' : 'uncontrolled') + " to " + (isControlled ? 'controlled' : 'uncontrolled') + ".");
  }

  ref.current = isControlled;
  let setValue = useCallback(function (value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    let onChangeCaller = function onChangeCaller(value) {
      if (onChange) {
        if (!Object.is(stateRef.current, value)) {
          for (var _len2 = arguments.length, onChangeArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            onChangeArgs[_key2 - 1] = arguments[_key2];
          }

          onChange(value, ...onChangeArgs);
        }
      }

      if (!isControlled) {
        stateRef.current = value;
      }
    };

    if (typeof value === 'function') {
      // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates
      // when someone using useControlledState calls setControlledState(myFunc)
      // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc
      // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning
      // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same
      let updateFunction = function updateFunction(oldValue) {
        for (var _len3 = arguments.length, functionArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          functionArgs[_key3 - 1] = arguments[_key3];
        }

        let interceptedValue = value(isControlled ? stateRef.current : oldValue, ...functionArgs);
        onChangeCaller(interceptedValue, ...args);

        if (!isControlled) {
          return interceptedValue;
        }

        return oldValue;
      };

      setStateValue(updateFunction);
    } else {
      if (!isControlled) {
        setStateValue(value);
      }

      onChangeCaller(value, ...args);
    }
  }, [isControlled, onChange]); // If a controlled component's value prop changes, we need to update stateRef

  if (isControlled) {
    stateRef.current = value;
  } else {
    value = stateValue;
  }

  return [value, setValue];
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

/**
 * Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest valid step.
 */
export function clamp(value, min, max) {
  if (min === void 0) {
    min = -Infinity;
  }

  if (max === void 0) {
    max = Infinity;
  }

  let newValue = Math.min(Math.max(value, min), max);
  return newValue;
}
export function snapValueToStep(value, min, max, step) {
  let remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;

  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  } // correct floating point behavior by rounding to step precision


  let string = step.toString();
  let index = string.indexOf('.');
  let precision = index >= 0 ? string.length - index : 0;

  if (precision > 0) {
    let pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }

  return snappedValue;
}
/* Takes a value and rounds off to the number of digits. */

export function toFixedNumber(value, digits, base) {
  if (base === void 0) {
    base = 10;
  }

  const pow = Math.pow(base, digits);
  return Math.round(value * pow) / pow;
}
//# sourceMappingURL=module.js.map
