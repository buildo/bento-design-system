import { useControlledState } from "@react-stately/utils";

/**
 * Provides state management for toggle components like checkboxes and switches.
 */
export function useToggleState(props) {
  if (props === void 0) {
    props = {};
  }

  let {
    isReadOnly,
    onChange
  } = props; // have to provide an empty function so useControlledState doesn't throw a fit
  // can't use useControlledState's prop calling because we need the event object from the change

  let [isSelected, setSelected] = useControlledState(props.isSelected, props.defaultSelected || false, () => {});

  function updateSelected(value) {
    if (!isReadOnly) {
      setSelected(value);

      if (onChange) {
        onChange(value);
      }
    }
  }

  function toggleState() {
    if (!isReadOnly) {
      setSelected(prev => {
        let newVal = !prev;

        if (onChange) {
          onChange(newVal);
        }

        return newVal;
      });
    }
  }

  return {
    isSelected,
    setSelected: updateSelected,
    toggle: toggleState
  };
}
//# sourceMappingURL=module.js.map
