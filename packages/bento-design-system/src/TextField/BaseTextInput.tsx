import { useBentoConfig } from "../BentoConfigContext";
import { Box } from "../Box/Box";
import { Children } from "../util/Children";
import { LocalizedString } from "../util/LocalizedString";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { inputContainerRecipe, input } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { getReadOnlyBackgroundStyle } from "../Field/utils";
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
  type?: "text" | "email" | "url" | "password" | "search";
  disabled?: boolean;
  isReadOnly?: boolean;
  leftAccessory?: Children;
  rightAccessory?: Children;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
};

export function BaseTextInput(props: Props) {
  const config = useBentoConfig().input;
  const { defaultMessages } = useDefaultMessages();

  const [showPassword, setShowPassword] = useState(false);
  const passwordIcon = showPassword ? config.passwordHideIcon : config.passwordShowIcon;
  const passwordIconLabel = showPassword
    ? props.hidePasswordLabel ?? defaultMessages.TextField.hidePasswordLabel
    : props.showPasswordLabel ?? defaultMessages.TextField.showPasswordLabel;

  const type = match(props.type ?? "text")
    .with("password", () => (showPassword ? "text" : "password"))
    .with("text", "email", "url", "search", () => props.type)
    .exhaustive();

  const rightAccessory = match(props.type ?? "text")
    .with("password", () => (
      // if we have both a rightAccessory and type='password', display the accessory on the left of the password toggle field
      <Columns space={config.internalSpacing} alignY="center">
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
    .with("email", "text", "url", "search", () => props.rightAccessory)
    .exhaustive();

  return (
    <Box
      display="flex"
      className={inputContainerRecipe({
        validation: props.isReadOnly ? "notSet" : props.validationState ?? "notSet",
      })}
      gap={config.internalSpacing}
      paddingX={config.paddingX}
      paddingY={config.paddingY}
      background={config.background.default}
      {...getRadiusPropsFromConfig(config.radius)}
      style={getReadOnlyBackgroundStyle(config)}
      disabled={props.disabled}
      readOnly={props.isReadOnly}
    >
      {props.leftAccessory && (
        <Box display="flex" justifyContent="center" alignItems="center">
          {props.leftAccessory}
        </Box>
      )}
      <Box
        as="input"
        {...props.inputProps}
        ref={props.inputRef}
        placeholder={props.placeholder}
        type={type}
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
        outline="none"
        flexGrow={1}
      />
      {rightAccessory && (
        <Box display="flex" justifyContent="center" alignItems="center">
          {rightAccessory}
        </Box>
      )}
    </Box>
  );
}
