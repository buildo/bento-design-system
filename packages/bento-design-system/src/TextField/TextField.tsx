import { useTextField } from "@react-aria/textfield";
import { useRef, useState } from "react";
import { Box, IconButton, Field } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { inputRecipe } from "../Field/Field.css";
import { FieldProps } from "../Field/FieldProps";
import { bodyRecipe } from "../Typography/Body/Body.css";
import useDimensions from "react-cool-dimensions";
import { defaultMessages } from "../../test/util/defaultMessages";
import { useBentoConfig } from "../BentoConfigContext";

type Props = FieldProps<string> & {
  placeholder: LocalizedString;
  type?: "text" | "email" | "url" | "password";
  isReadOnly?: boolean;
  showPasswordLabel?: LocalizedString;
  hidePasswordLabel?: LocalizedString;
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
              color: props.disabled ? "disabled" : "default",
              weight: "default",
              size: config.fontSize,
            }),
          ]}
          style={{ paddingRight: rightAccessoryWidth, flexGrow: 1 }}
        />
        {props.type === "password" && (
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
            <IconButton
              size={config.passwordIconSize}
              icon={passwordIcon}
              onPress={() => setShowPassword((prevValue) => !prevValue)}
              kind="transparent"
              hierarchy="secondary"
              label={passwordIconLabel}
            />
          </Box>
        )}
      </Box>
    </Field>
  );
}

export type { Props as TextFieldProps };
