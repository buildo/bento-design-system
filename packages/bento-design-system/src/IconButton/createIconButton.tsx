import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { BentoSprinkles, Box } from "../internal";
import { Children } from "../util/Children";
import { IconProps } from "../Icons/IconProps";
import { iconButtonRecipe } from "./IconButton.css";
import { buttonRecipe } from "../Button/Button.css";
import { LocalizedString } from "../util/LocalizedString";

type IconButtonConfig = {
  radius: BentoSprinkles["borderRadius"];
  padding: Record<IconProps["size"], BentoSprinkles["padding"]>;
};
export const defaultIconButtonConfig: IconButtonConfig = {
  radius: 4,
  padding: {
    8: 8,
    12: 8,
    16: 16,
    24: 16,
  },
};

type Props = {
  kind: "solid" | "transparent";
  hierarchy: "primary" | "secondary" | "danger";
  label: LocalizedString;
  onPress: () => void;
  size: IconProps["size"];
  tabIndex?: number;
  isDisabled?: boolean;
  icon: (props: IconProps) => Children;
};

export function createIconButton(config: IconButtonConfig) {
  return function IconButton(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { buttonProps } = useButton(
      {
        ...props,
        // NOTE(gabro): this is a workaround for https://github.com/adobe/react-spectrum/issues/2506
        // onPress does not work for pseudo-elements (which we use to increase the hit area of icon
        // buttons) so we need to use onClick instead. The types don't officially include  `onClick`
        // since it's deprecated in favor of `onPress`, but it works in practice.
        ["onClick" as any]: props.onPress,
        onPress: (e) => {
          if (e.pointerType === "keyboard") props.onPress();
        },
      },
      ref
    );
    return (
      <Box
        as="button"
        {...buttonProps}
        title={props.label}
        color={undefined}
        className={[
          buttonRecipe({
            hierarchy: props.hierarchy,
            kind: props.kind,
            size: "medium",
            active: false,
          }),
          iconButtonRecipe({ kind: props.kind, size: props.size }),
        ]}
        tabIndex={props.tabIndex ?? buttonProps.tabIndex}
        alignItems="center"
        justifyContent="center"
        borderRadius={config.radius}
        padding={props.kind === "solid" ? config.padding[props.size] : undefined}
      >
        {props.icon({ size: props.size, color: "inherit" })}
      </Box>
    );
  };
}

export type { Props as IconButtonProps };
