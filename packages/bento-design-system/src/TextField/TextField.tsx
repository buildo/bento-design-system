import { useTextField } from "@react-aria/textfield";
import { useRef, useState } from "react";
import { Box, IconButton, Field, Children, Columns } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { inputRecipe } from "../Field/Field.css";
import { FieldProps } from "../Field/FieldProps";
import { bodyRecipe } from "../Typography/Body/Body.css";
import useDimensions from "react-cool-dimensions";
import { defaultMessages } from "../../test/util/defaultMessages";
import { useBentoConfig } from "../BentoConfigContext";
import { match } from "ts-pattern";

type Props = FieldProps<string> & {
  placeholder: LocalizedString;
  isReadOnly?: boolean;
  type?: "text" | "email" | "url" | "password";
  rightAccessory?: Children;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
};

export function TextField(props: Props) {
  const config = useBentoConfig().input;
  const inputRef = useRef<HTMLInputElement>(null);

  const { observe: rightAccessoryRef, width: rightAccessoryWidth } = useDimensions({
    // This is needed to include the padding in the width
    useBorderBoxSize: true,
  });

  const validationState = props.isReadOnly ? undefined : props.issues ? "invalid" : "valid";

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...props,
      errorMessage: props.issues,
      description: props.assistiveText,
      validationState,
      isDisabled: props.disabled,
    },
    inputRef
  );

  const [showPassword, setShowPassword] = useState(false);
  const passwordIcon = showPassword ? config.passwordHideIcon : config.passwordShowIcon;
  const passwordIconLabel = showPassword
    ? props.hidePasswordLabel ?? defaultMessages.TextField.hidePasswordLabel
    : props.showPasswordLabel ?? defaultMessages.TextField.showPasswordLabel;

  const type = props.type === "password" && !showPassword ? "password" : "text";

  const rightAccessory = match(props.type ?? "text")
    .with("password", () => (
      // if we have both a rightAccessory and type='password', display the accessory on the left of the password toggle field
      <Columns space={config.paddingX} alignY="center">
        <IconButton
          size={config.passwordIconSize}
          icon={passwordIcon}
          onPress={() => setShowPassword((prevValue) => !prevValue)}
          kind="transparent"
          hierarchy="secondary"
          label={passwordIconLabel}
        />
        {props.rightAccessory}
      </Columns>
    ))
    .with("email", "text", "url", () => props.rightAccessory)
    .exhaustive();

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box position="relative" display="flex">
        <Box
          as="input"
          ref={inputRef}
          {...inputProps}
          type={type}
          // NOTE(gabro): this is to please TS, since the inputProps type is very broad
          color={undefined}
          width={undefined}
          height={undefined}
          borderRadius={config.radius}
          paddingX={config.paddingX}
          paddingY={config.paddingY}
          className={[
            inputRecipe({ validation: validationState || "notSet" }),
            bodyRecipe({
              color: props.disabled ? "disabled" : "primary",
              weight: "default",
              size: config.fontSize,
            }),
          ]}
          style={{ paddingRight: rightAccessory ? rightAccessoryWidth : undefined, flexGrow: 1 }}
        />
        {rightAccessory && (
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
            {rightAccessory}
          </Box>
        )}
      </Box>
    </Field>
  );
}

export type { Props as TextFieldProps };
