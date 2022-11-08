import { useTextField } from "@react-aria/textfield";
import { HTMLAttributes, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { LocalizedString, Box, Field, IconButton } from "..";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { input } from "./SearchBar.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { useBentoConfig } from "../BentoConfigContext";
import { AtLeast } from "../util/AtLeast";

type Props = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> & {
  value: string;
  onChange: (value: string) => unknown;
  onBlur?: () => unknown;
  placeholder: LocalizedString;
  disabled?: boolean;
  clearButtonLabel?: LocalizedString;
  autoFocus?: boolean;
};

export function SearchBar(props: Props) {
  const config = useBentoConfig().searchBar;
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
      <Box position="relative" display="flex">
        <Box
          ref={leftAccessoryRef}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingLeft={config.paddingX}
          paddingRight={config.internalSpacing}
          top={0}
          bottom={0}
          left={0}
        >
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
            inputRecipe({ validation: "valid" }),
            bodyRecipe({
              color: props.disabled ? "disabled" : "primary",
              weight: "default",
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
          paddingY={config.paddingY}
        />
        {rightAccessoryContent && (
          <Box
            ref={rightAccessoryRef}
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingLeft={config.internalSpacing}
            paddingRight={config.paddingX}
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
}

export type { Props as SearchBarProps };
