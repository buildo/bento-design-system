import { ComponentProps, FunctionComponent } from "react";
import { CellProps } from "react-table";
import {
  LocalizedString,
  Body,
  ButtonProps,
  ChipProps,
  IconProps,
  Label,
  Link,
  Children,
  Inline,
  Inset,
  Box,
  Button,
  Tooltip,
  Chip,
  IconButton,
  IconButtonProps,
  ButtonLink,
  ButtonLinkProps,
  BodyProps,
} from "..";
import { useBentoConfig } from "../BentoConfigContext";

export function ButtonCell({
  value: buttonProps,
  column: { align },
  options: { size },
}: CellProps<{}, Omit<ButtonProps, "size">> & {
  options: Partial<Pick<ButtonProps, "size">>;
}) {
  return (
    <Inline space={0} align={align} alignY="center">
      <Button size={size ?? "medium"} {...buttonProps} />
    </Inline>
  );
}

export function ButtonLinkCell({
  value: buttonProps,
  column: { align },
  options: { size },
}: CellProps<{}, Omit<ButtonLinkProps, "size">> & {
  options: Partial<Pick<ButtonLinkProps, "size">>;
}) {
  return (
    <Inline space={0} align={align}>
      <ButtonLink size={size ?? "medium"} {...buttonProps} />
    </Inline>
  );
}

export function TextCell({
  value,
  column: { align },
  options: { size, weight, color },
}: CellProps<{}, LocalizedString> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">>;
}) {
  return (
    <Box padding={16} textAlign={align}>
      <Body size={size ?? "medium"} weight={weight} color={color}>
        {value}
      </Body>
    </Box>
  );
}

export function TextWithIconCell({
  value: { icon, iconPosition, text, tooltipContent },
  column: { align },
  options: { size, weight, color },
}: CellProps<
  {},
  {
    icon: FunctionComponent<IconProps> | null;
    iconPosition: "left" | "right";
    text: LocalizedString;
    tooltipContent?: Children;
  }
> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">>;
}) {
  const config = useBentoConfig().table;
  const icon_ = icon && icon({ size: 12 });

  return (
    <Inset space={16}>
      <Inline space={8} alignY="center" align={align} reverse={iconPosition === "right"}>
        {tooltipContent ? (
          <Tooltip
            content={tooltipContent}
            placement={config.cellTooltipPlacement}
            trigger={(ref, triggerProps) => (
              <Box ref={ref} {...triggerProps}>
                {icon_}
              </Box>
            )}
          />
        ) : (
          icon_
        )}
        <Body size={size ?? "medium"} weight={weight} color={color}>
          {text}
        </Body>
      </Inline>
    </Inset>
  );
}

export function ChipCell({ value: chipProps, column: { align } }: CellProps<{}, ChipProps>) {
  return (
    <Inset space={16}>
      <Inline space={0} align={align} alignY="center">
        <Chip {...chipProps} />
      </Inline>
    </Inset>
  );
}

export function LabelCell({ value, column: { align } }: CellProps<{}, LocalizedString>) {
  return (
    <Box padding={16} textAlign={align}>
      <Label size="large">{value}</Label>
    </Box>
  );
}

export function LinkCell({
  value,
  column: { align },
  options: { size, weight },
}: CellProps<{}, ComponentProps<typeof Link>> & {
  options: Partial<Pick<BodyProps, "size" | "weight">>;
}) {
  return (
    <Box padding={16} textAlign={align}>
      <Body size={size ?? "medium"} weight={weight}>
        <Link {...value} />
      </Body>
    </Box>
  );
}

export function IconCell({
  value,
  column: { align },
  options: { size, color },
}: CellProps<{}, { icon: (props: IconProps) => JSX.Element; label: LocalizedString }> & {
  options: Partial<Pick<IconProps, "size" | "color">>;
}) {
  return (
    <Box padding={16} textAlign={align} aria-label={value.label}>
      {value.icon({ size: size ?? 16, color: color ?? "default" })}
    </Box>
  );
}

export function IconButtonCell({
  value: iconButtonProps,
  column: { align },
  options: { size, hierarchy, kind },
}: CellProps<{}, Omit<IconButtonProps, "size" | "kind" | "hierarchy">> & {
  options: Partial<Pick<IconButtonProps, "size" | "kind" | "hierarchy">>;
}) {
  return (
    <Inline space={0} align={align} alignY="center">
      <IconButton
        kind={kind ?? "transparent"}
        hierarchy={hierarchy ?? "primary"}
        size={size ?? 16}
        {...iconButtonProps}
      />
    </Inline>
  );
}
