import { LocalizedString } from "../util/LocalizedString";
import { Box } from "../Box/Box";
import { buttonRecipe } from "./Button.css";
import { useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { Label } from "../Typography/Label/Label";
import { Column, Columns } from "../Layout/Columns";
import { IconProps } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import pick from "lodash.pick";

const otherButtonKeys = [
  "name",
  "value",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
] as const;

export type OtherButtonKeys = (typeof otherButtonKeys)[number];
export type ButtonSize = "small" | "medium" | "large";
type Props = {
  label: LocalizedString;
  onPress: () => void;
  kind: "solid" | "transparent" | "outline";
  hierarchy: "primary" | "secondary" | "danger";
  isDisabled?: boolean;
  size?: ButtonSize;
  icon?: (props: IconProps) => JSX.Element;
  iconPosition?: "leading" | "trailing";
} & Omit<AriaButtonProps<"button">, "onPress"> &
  Pick<React.HTMLProps<HTMLButtonElement>, OtherButtonKeys>;

/**
 * A button
 */
export function Button(props: Props) {
  const config = useBentoConfig().button;
  const iconPosition = props.iconPosition ?? config.defaultIconPosition;
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const {
    onKeyDown,
    onKeyUp,
    // NOTE(gabro): `useButton` uses `usePress` internally, which interplays strangely with
    // react-select, since they both manage the focus manually. This prop (which is not visible
    // via TypeScript) causes Button to bypass the onClick return by `usePress` (via `useButton`)
    // and turns "off" `onPointerDown` (which is where the focus managing happens in react-aria).
    //
    // @ts-expect-error
    internal_unsafe__bypassUsePress,
  } = props;

  const otherButtonProps = pick(props, otherButtonKeys);

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
      {...otherButtonProps}
      color={undefined}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      paddingX={config.paddingX[size]}
      paddingY={config.paddingY[size]}
      borderRadius={config.radius}
      onPointerDown={internal_unsafe__bypassUsePress ? undefined : buttonProps.onPointerDown}
      onClick={internal_unsafe__bypassUsePress ? props.onPress : buttonProps.onClick}
    >
      <Columns space={config.internalSpacing} alignY="center" reverse={iconPosition === "trailing"}>
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
}

export type { Props as ButtonProps };
