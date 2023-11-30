import { useBentoConfig } from "../BentoConfigContext";
import { Box } from "../Box/Box";
import { Children } from "../util/Children";
import { LocalizedString } from "../util/LocalizedString";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { getReadOnlyBackgroundStyle } from "../Field/utils";
import useDimensions from "react-cool-dimensions";
import { match } from "ts-pattern";
import { Columns } from "../Layout/Columns";
import { IconButton } from "../IconButton/IconButton";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { useState } from "react";

type Props = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: React.Ref<HTMLInputElement>;
  placeholder?: LocalizedString;
  validationState?: "valid" | "invalid";
  type?: "text" | "email" | "url" | "password";
  disabled?: boolean;
  isReadOnly?: boolean;
  rightAccessory?: Children;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
};

export function BaseTextInput(props: Props) {
  const config = useBentoConfig().input;
  const { defaultMessages } = useDefaultMessages();

  const { observe: rightAccessoryRef, width: rightAccessoryWidth } = useDimensions({
    // This is needed to include the padding in the width
    useBorderBoxSize: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const passwordIcon = showPassword ? config.passwordHideIcon : config.passwordShowIcon;
  const passwordIconLabel = showPassword
    ? props.hidePasswordLabel ?? defaultMessages.TextField.hidePasswordLabel
    : props.showPasswordLabel ?? defaultMessages.TextField.showPasswordLabel;

  const type = match(props.type ?? "text")
    .with("password", () => (showPassword ? "text" : "password"))
    .with("text", "email", "url", () => props.type)
    .exhaustive();

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
    <Box position="relative" display="flex">
      <Box
        as="input"
        {...props.inputProps}
        ref={props.inputRef}
        placeholder={props.placeholder}
        type={type}
        // NOTE(gabro): this is to please TS, since the inputProps type is very broad
        color={undefined}
        width={undefined}
        height={undefined}
        className={[
          inputRecipe({
            validation: props.isReadOnly ? "notSet" : props.validationState ?? "notSet",
          }),
          bodyRecipe({
            color: props.disabled ? "disabled" : "primary",
            weight: "default",
            size: config.fontSize,
            ellipsis: false,
          }),
        ]}
        {...getRadiusPropsFromConfig(config.radius)}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        background={config.background.default}
        style={{
          paddingRight: rightAccessory ? rightAccessoryWidth : undefined,
          flexGrow: 1,
          ...getReadOnlyBackgroundStyle(config),
        }}
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
  );
}
