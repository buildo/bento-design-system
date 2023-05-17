import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { Box } from "..";
import { Children } from "../util/Children";
import { IconProps } from "../Icons/IconProps";
import { iconButtonRecipe } from "./IconButton.css";
import { buttonRecipe } from "../Button/Button.css";
import { LocalizedString } from "../util/LocalizedString";
import { useBentoConfig } from "../BentoConfigContext";
import { match } from "ts-pattern";

type Props = {
  kind: "solid" | "transparent" | "outline";
  hierarchy: "primary" | "secondary" | "danger";
  label: LocalizedString;
  onPress: () => void;
  size: Exclude<IconProps["size"], 40>;
  tabIndex?: number;
  isDisabled?: boolean;
  icon: (props: IconProps) => Children;
};

export function IconButton(props: Props) {
  const config = useBentoConfig().iconButton;
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

  const paddingConfig = config.padding[props.size];

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
      {...match(props.kind)
        .with("solid", "outline", () =>
          paddingConfig && typeof paddingConfig === "object" && "paddingX" in paddingConfig
            ? paddingConfig
            : { padding: paddingConfig }
        )
        .with("transparent", () => {})
        .exhaustive()}
    >
      {props.icon({ size: props.size, color: "inherit" })}
    </Box>
  );
}

export type { Props as IconButtonProps };
