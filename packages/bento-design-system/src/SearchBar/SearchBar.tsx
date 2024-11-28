import { useTextField } from "@react-aria/textfield";
import { HTMLAttributes, useRef } from "react";
import { LocalizedString, Field, IconButton, BaseTextInput } from "..";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { useBentoConfig } from "../BentoConfigContext";
import { AtLeast } from "../util/AtLeast";

type Props = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> & {
  value: string;
  onChange: (value: string) => unknown;
  onBlur?: () => unknown;
  placeholder?: LocalizedString;
  disabled?: boolean;
  clearButtonLabel?: LocalizedString;
  autoFocus?: boolean;
};

export function SearchBar(props: Props) {
  const config = useBentoConfig().searchBar;
  const inputRef = useRef<HTMLInputElement>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...props,
      isDisabled: props.disabled,
    },
    inputRef
  );

  const { defaultMessages } = useDefaultMessages();

  const rightAccessory =
    props.value.length > 0 ? (
      <IconButton
        label={props.clearButtonLabel ?? defaultMessages.SearchBar.clearButtonLabel}
        onPress={() => props.onChange("")}
        size={config.clearIconSize}
        icon={config.clearIcon}
        kind="transparent"
        hierarchy="secondary"
      />
    ) : null;

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <BaseTextInput
        leftAccessory={config.searchIcon({ size: config.searchIconSize })}
        rightAccessory={rightAccessory}
        inputProps={inputProps}
        inputRef={inputRef}
        validationState="valid"
        type="search"
        {...props}
      />
    </Field>
  );
}

export type { Props as SearchBarProps };
