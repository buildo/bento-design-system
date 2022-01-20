import { LocalizedString } from "../util/LocalizedString";
import { Box } from "../internal/Box/Box";
import { buttonRecipe } from "./Button.css";
import { ComponentProps, useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { CommonProps } from "../util/CommonProps";
import { Label } from "../Typography/Label/Label";
import { BentoSprinkles } from "src/internal";

type Size = "small" | "medium";
type Props = CommonProps & {
  label: LocalizedString;
  onPress: () => void;
  kind: "primary" | "danger" | "ghostPrimary" | "ghostDanger";
  isDisabled?: boolean;
  size?: Size;
} & AriaButtonProps<"button">;

type SizeConfig<T> = {
  [k in Size]: T;
};

type ButtonConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: ComponentProps<typeof Label>["size"];
  radius: BentoSprinkles["borderRadius"];
};

export function createButton(config: ButtonConfig) {
  return function Button(props: Props) {
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
        paddingX={config.paddingX}
        paddingY={config.paddingY[size]}
        borderRadius={config.radius}
      >
        <Label size={config.labelSize}>{props.label}</Label>
      </Box>
    );
  };
}
