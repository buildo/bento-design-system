import { HTMLAttributes, useRef } from "react";
import { InternalCheckbox } from "./InternalCheckbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useToggleState } from "@react-stately/toggle";
import { FieldProps } from "../Field/FieldProps";
import { AtLeast } from "../util/AtLeast";

type Props = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> &
  Pick<FieldProps<boolean>, "value" | "onChange" | "disabled">;

/**
 * Standalone checkbox component, meant to be used to build custom selection components
 * (for example, a selectable card).
 *
 * Since it has no label, users must pass either `aria-label` or `aria-labelledby` in order to
 * preserve accessibility.
 */
export function Checkbox({ value, disabled, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxProps = {
    ...props,
    value: undefined,
    isSelected: value,
    isDisabled: disabled,
  };
  const state = useToggleState(checkboxProps);
  const { inputProps } = useCheckbox(checkboxProps, state, inputRef);

  return (
    <InternalCheckbox
      option={{ label: undefined, isSelected: value, isDisabled: disabled }}
      inputRef={inputRef}
      inputProps={inputProps}
    />
  );
}
