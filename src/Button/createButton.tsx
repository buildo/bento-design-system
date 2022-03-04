import { LocalizedString } from "../util/LocalizedString";
import { Box } from "../internal/Box/Box";
import { buttonRecipe } from "./Button.css";
import { ComponentProps, useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles, Column, Columns } from "../internal";
import { IconProps } from "../";

type Size = "small" | "medium" | "large";
export type ButtonProps = {
  label: LocalizedString;
  onPress: () => void;
  kind: "solid" | "transparent" | "outline";
  hierarchy: "primary" | "secondary" | "danger";
  isDisabled?: boolean;
  size?: Size;
  icon?: (props: IconProps) => JSX.Element;
} & AriaButtonProps<"button">;

type SizeConfig<T> = {
  [k in Size]: T;
};

export type ButtonConfig = {
  paddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: ComponentProps<typeof Label>["size"];
  radius: BentoSprinkles["borderRadius"];
  internalSpacing: BentoSprinkles["gap"];
  iconSize: SizeConfig<IconProps["size"]>;
  uppercaseLabel: boolean;
};

export const defaultButtonConfig: ButtonConfig = {
  paddingX: {
    small: 8,
    medium: 16,
    large: 16,
  },
  paddingY: {
    small: 4,
    medium: 8,
    large: 16,
  },
  labelSize: "large",
  radius: 8,
  internalSpacing: 8,
  iconSize: {
    small: 12,
    medium: 12,
    large: 16,
  },
  uppercaseLabel: true,
};

export function createButton(config: ButtonConfig = defaultButtonConfig) {
  return function Button(props: ButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { onKeyDown, onKeyUp } = props;

    const size = props.size || "medium";

    return (
      <Box
        as="button"
        ref={ref}
        className={buttonRecipe({
          kind: props.kind,
          hierarchy: props.hierarchy,
          size,
        })}
        {...buttonProps}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        paddingX={config.paddingX[size]}
        paddingY={config.paddingY[size]}
        borderRadius={config.radius}
      >
        <Columns space={config.internalSpacing} alignY="center">
          {props.icon && (
            <Column width="content">
              {props.icon({
                size: config.iconSize[size],
                color: "inherit",
              })}
            </Column>
          )}
          <Label size={config.labelSize} uppercase={config.uppercaseLabel}>
            {props.label}
          </Label>
        </Columns>
      </Box>
    );
  };
}
