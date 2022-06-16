import { LocalizedString } from "../util/LocalizedString";
import { Box } from "../internal/Box/Box";
import { buttonRecipe } from "./Button.css";
import { useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { Label } from "../Typography/Label/Label";
import { Column, Columns } from "../internal";
import { IconProps } from "../";
import { ButtonConfig } from "./Config";

export type ButtonSize = "small" | "medium" | "large";
type Props = {
  label: LocalizedString;
  onPress: () => void;
  kind: "solid" | "transparent" | "outline";
  hierarchy: "primary" | "secondary" | "danger";
  isDisabled?: boolean;
  size?: ButtonSize;
  icon?: (props: IconProps) => JSX.Element;
} & Omit<AriaButtonProps<"button">, "onPress">;

/**
 * A button
 */
export function createButton(config: ButtonConfig) {
  return function Button(props: Props) {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const {
      onKeyDown,
      onKeyUp,
      // NOTE(gabro): `useButton` uses `usePress` internally, which behaves interplays strangely with
      // react-select, since they both manage the focus manually. This prop (which is not visible
      // via TypeScript) causes Button to bypass the onClick return by `usePress` (via `useButton`)
      // and turns "off" `onPointerDown` (which is where the focus managing happens in react-aria).
      //
      // @ts-expect-error
      internal_unsafe__bypassUsePress,
    } = props;

    const size = props.size ?? config.defaultSize;

    return (
      <Box
        as="button"
        ref={ref}
        className={buttonRecipe({
          kind: props.kind,
          hierarchy: props.hierarchy,
          size,
          active: false,
        })}
        {...buttonProps}
        color={undefined}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        paddingX={config.paddingX[size]}
        paddingY={config.paddingY[size]}
        borderRadius={config.radius}
        onPointerDown={internal_unsafe__bypassUsePress ? undefined : buttonProps.onPointerDown}
        onClick={internal_unsafe__bypassUsePress ? props.onPress : buttonProps.onClick}
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

export type { Props as ButtonProps };
