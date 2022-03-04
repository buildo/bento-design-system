import { useTextField } from "@react-aria/textfield";
import { FunctionComponent, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { IconButton, IconClose, IconSearch, LocalizedString } from "..";
import { Box } from "../internal";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { input } from "./SearchBar.css";
import { FieldType } from "../Field/createField";
import { defaultInputConfig, InputConfig } from "../Field/InputConfig";
import { IconProps } from "../Icons/IconProps";
import { useDefaultMessages } from "../util/useDefaultMessages";

type Props = {
  value: string;
  onChange: (value: string) => unknown;
  onBlur?: () => unknown;
  placeholder: LocalizedString;
  disabled?: boolean;
  clearButtonLabel?: LocalizedString;
};

export type SearchBarConfig = {
  clearIcon: FunctionComponent<IconProps>;
  searchIcon: FunctionComponent<IconProps>;
};

export function createSearchBar(
  Field: FieldType,
  config: InputConfig & SearchBarConfig = {
    ...defaultInputConfig,
    clearIcon: IconClose,
    searchIcon: IconSearch,
  }
) {
  return function SearchBar(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { observe: leftAccessoryRef, width: leftAccessoryWidth } = useDimensions({
      // This is needed to include the padding in the width calculation
      useBorderBoxSize: true,
    });

    const { observe: rightAccessoryRef, width: rightAccessoryWidth } = useDimensions({
      // This is needed to include the padding in the width calculation
      useBorderBoxSize: true,
    });

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
          size={16}
          icon={config.clearIcon}
        />
      ) : null;

    return (
      <Field
        {...props}
        labelProps={labelProps}
        assistiveTextProps={descriptionProps}
        errorMessageProps={errorMessageProps}
      >
        <Box position="relative" display="flex">
          <Box
            ref={leftAccessoryRef}
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingX={config.paddingX}
            top={0}
            bottom={0}
            left={0}
          >
            <config.searchIcon size={16} />
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
              inputRecipe({ validation: "valid" }),
              bodyRecipe({
                color: props.disabled ? "disabled" : "default",
                weight: "regular",
                size: config.fontSize,
              }),
            ]}
            display="flex"
            style={{
              flexGrow: 1,
              paddingLeft: leftAccessoryWidth,
              paddingRight: rightAccessoryWidth,
            }}
            borderRadius={config.radius}
            paddingX={config.paddingX}
            paddingY={config.paddingY}
          />
          {rightAccessoryContent && (
            <Box
              ref={rightAccessoryRef}
              position="absolute"
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingX={config.paddingX}
              top={0}
              bottom={0}
              right={0}
            >
              {rightAccessoryContent}
            </Box>
          )}
        </Box>
      </Field>
    );
  };
}
