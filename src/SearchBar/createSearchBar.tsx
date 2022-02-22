import { useTextField } from "@react-aria/textfield";
import { FunctionComponent, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { IconButton, LocalizedString } from "..";
import { Box } from "../internal";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { input } from "./SearchBar.css";
import { FieldType } from "src/Field/createField";
import { InputConfig } from "src/Field/InputConfig";
import { IconProps } from "src/Icons/IconProps";

type Props = {
  value: string;
  onChange: (value: string) => unknown;
  onBlur?: () => unknown;
  placeholder: LocalizedString;
  disabled?: boolean;
  clearButtonLabel: LocalizedString;
};

export type SearchBarConfig = {
  clearIcon: FunctionComponent<IconProps>;
  searchIcon: FunctionComponent<IconProps>;
};

export function createSearchBar(
  Field: FieldType,
  inputConfig: InputConfig,
  config: SearchBarConfig
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

    const rightAccessoryContent =
      props.value.length > 0 ? (
        <IconButton
          label={props.clearButtonLabel}
          onPress={() => props.onChange("")}
          size={16}
          icon={config.clearIcon}
          color="primary"
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
            paddingX={16}
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
                size: inputConfig.fontSize,
              }),
            ]}
            display="flex"
            style={{
              flexGrow: 1,
              paddingLeft: leftAccessoryWidth,
              paddingRight: rightAccessoryWidth,
            }}
            borderRadius={inputConfig.radius}
            paddingX={inputConfig.paddingX}
            paddingY={inputConfig.paddingY}
          />
          {rightAccessoryContent && (
            <Box
              ref={rightAccessoryRef}
              position="absolute"
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingX={16}
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
