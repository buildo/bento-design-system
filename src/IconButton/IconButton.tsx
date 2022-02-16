import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { Box } from "../internal";
import { Children } from "../util/Children";
import { IconProps } from "../Icons/IconProps";
import { iconButton } from "./IconButton.css";
import { IconButtonProps } from "./IconButtonProps";

type Props = IconButtonProps & {
  icon: (props: IconProps) => Children;
};

export function IconButton(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { buttonProps } = useButton(
    {
      ...props,
      elementType: "div",
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
      {...buttonProps}
      title={props.label}
      color={undefined}
      className={iconButton}
      tabIndex={props.tabIndex || buttonProps.tabIndex}
    >
      {props.icon({ size: props.size, color: props.color })}
    </Box>
  );
}
