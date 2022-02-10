import { LocalizedString } from "../util/LocalizedString";
import { Box } from "../internal/Box/Box";
import { buttonRecipe } from "./Button.css";
import { ComponentProps, useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles } from "../internal";

type Size = "small" | "medium";
export type ButtonProps = {
  label: LocalizedString;
  onPress: () => void;
  kind: "primary" | "danger" | "transparentPrimary";
  isDisabled?: boolean;
  size?: Size;
} & AriaButtonProps<"button">;

type SizeConfig<T> = {
  [k in Size]: T;
};

type ButtonConfig = {
  paddingX?: BentoSprinkles["paddingX"];
  paddingY?: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize?: ComponentProps<typeof Label>["size"];
  radius?: BentoSprinkles["borderRadius"];
};

export function createButton({
  paddingX = 16,
  paddingY = {
    small: 8,
    medium: 16,
  },
  labelSize = "large",
  radius = 8,
}: ButtonConfig) {
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
          size,
        })}
        {...buttonProps}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        paddingX={paddingX}
        paddingY={paddingY[size]}
        borderRadius={radius}
      >
        <Label size={labelSize}>{props.label}</Label>
      </Box>
    );
  };
}
