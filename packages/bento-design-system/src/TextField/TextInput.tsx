import { HTMLAttributes, useRef } from "react";
import { AtLeast } from "../util/AtLeast";
import { FieldProps } from "../Field/FieldProps";
import { InternalTextInput } from "./InternalTextInput";
import { useTextField } from "@react-aria/textfield";
import { LocalizedString } from "../util/LocalizedString";
import { Children } from "../util/Children";

type Props = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> &
  Pick<FieldProps<string>, "autoFocus" | "disabled" | "onBlur" | "onChange" | "value"> & {
    validationState: "valid" | "invalid";
    placeholder?: LocalizedString;
    isReadOnly?: boolean;
    type?: "text" | "email" | "url" | "password";
    rightAccessory?: Children;
    showPasswordLabel?: never;
    hidePasswordLabel?: never;
  };

/**
 * Standalone text input component.
 *
 * Since it has no label, users must pass either `aria-label` or `aria-labelledby` in order to
 * preserve accessibility.
 */
export function TextInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputProps } = useTextField(
    {
      ...props,
      validationState: props.validationState,
      isDisabled: props.disabled,
    },
    inputRef
  );

  return <InternalTextInput inputProps={inputProps} inputRef={inputRef} {...props} />;
}

export type { Props as TextInputProps };
