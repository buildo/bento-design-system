import { useTextField } from "@react-aria/textfield";
import { HTMLAttributes, useRef } from "react";
import { LocalizedString, Box, Field, IconButton } from "..";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { input, inputContainer } from "./SearchBar.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { useBentoConfig } from "../BentoConfigContext";
import { AtLeast } from "../util/AtLeast";
import { getReadOnlyBackgroundStyle } from "../Field/utils";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

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

  const rightAccessoryContent =
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
      <Box
        display="flex"
        className={[inputRecipe({ validation: "valid" }), inputContainer]}
        gap={config.internalSpacing}
        paddingX={config.paddingX}
        background={config.background.default}
        paddingY={config.paddingY}
        {...getRadiusPropsFromConfig(config.radius)}
        style={getReadOnlyBackgroundStyle(config)}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {config.searchIcon({ size: config.searchIconSize })}
        </Box>
        <Box
          as="input"
          type="search"
          ref={inputRef}
          {...inputProps}
          // NOTE(gabro): this is to please TS, since the inputProps type is very broad
          color={undefined}
          width="full"
          height={undefined}
          className={[
            input,
            bodyRecipe({
              color: props.disabled ? "disabled" : "primary",
              weight: "default",
              size: config.fontSize,
              ellipsis: false,
            }),
          ]}
          display="flex"
          flexGrow={1}
        />
        {rightAccessoryContent && (
          <Box display="flex" justifyContent="center" alignItems="center">
            {rightAccessoryContent}
          </Box>
        )}
      </Box>
    </Field>
  );
}

export type { Props as SearchBarProps };
