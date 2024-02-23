import { ComponentProps } from "react";
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
  LabelProps,
} from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { mergeProps } from "@react-aria/utils";

export function ButtonCell({
  value: buttonProps,
  column: { align },
  options,
}: CellProps<{}, Omit<ButtonProps, "size">> & {
  options: Partial<Pick<ButtonProps, "size">>;
}) {
  const config = useBentoConfig().table;
  const { size } = mergeProps(config.defaultCellOptions.buttonCell, options);
  const padding = config.padding.buttonCell ?? config.padding.defaultCell;
  return (
    <Inset spaceX={padding.paddingX} spaceY={padding.paddingY}>
      <Inline space={0} align={align} alignY="center">
        <Button size={size} {...buttonProps} />
      </Inline>
    </Inset>
  );
}

export function ButtonLinkCell({
  value: buttonProps,
  column: { align },
  options,
}: CellProps<{}, Omit<ButtonLinkProps, "size">> & {
  options: Partial<Pick<ButtonLinkProps, "size">>;
}) {
  const config = useBentoConfig().table;
  const { size } = mergeProps(config.defaultCellOptions.buttonLinkCell, options);
  const padding = config.padding.buttonLinkCell ?? config.padding.defaultCell;
  return (
    <Inset spaceX={padding.paddingX} spaceY={padding.paddingY}>
      <Inline space={0} align={align}>
        <ButtonLink size={size} {...buttonProps} />
      </Inline>
    </Inset>
  );
}

export function TextCell({
  value,
  column: { align },
  options,
}: CellProps<{}, LocalizedString> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">>;
}) {
  const config = useBentoConfig().table;
  const padding = config.padding.textCell ?? config.padding.defaultCell;
  const { size, weight, color } = mergeProps(config.defaultCellOptions.textCell, options);
  return (
    <Box {...padding} textAlign={align}>
      <Body size={size} weight={weight} color={color}>
        {value}
      </Body>
    </Box>
  );
}

export function TextWithIconCell({
  value: { icon, iconPosition, text, tooltipContent },
  column: { align },
  options,
}: CellProps<
  {},
  {
    icon: ((props: IconProps) => Children) | null;
    iconPosition: "left" | "right";
    text: LocalizedString;
    tooltipContent?: Children;
  }
> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">> & {
    iconSize?: IconProps["size"];
    iconColor?: IconProps["color"];
  };
}) {
  const config = useBentoConfig().table;
  const { size, weight, color, iconSize, iconColor } = mergeProps(
    config.defaultCellOptions.textWithIconCell,
    options
  );
  const padding = config.padding.textWithIconCell ?? config.padding.defaultCell;
  const icon_ = icon && icon({ size: iconSize, color: iconColor });

  return (
    <Inset spaceX={padding.paddingX} spaceY={padding.paddingY}>
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
        <Body size={size} weight={weight} color={color}>
          {text}
        </Body>
      </Inline>
    </Inset>
  );
}

export function ChipCell({ value: chipProps, column: { align } }: CellProps<{}, ChipProps>) {
  const config = useBentoConfig().table;
  const padding = config.padding.chipCell ?? config.padding.defaultCell;
  return (
    <Inset spaceX={padding.paddingX} spaceY={padding.paddingY}>
      <Inline space={0} align={align} alignY="center">
        <Chip {...chipProps} />
      </Inline>
    </Inset>
  );
}

export function LabelCell({
  value,
  column: { align },
  options,
}: CellProps<{}, LocalizedString> & {
  options: Partial<Pick<LabelProps, "size" | "color">>;
}) {
  const config = useBentoConfig().table;
  const padding = config.padding.labelCell ?? config.padding.defaultCell;
  const { size, color } = mergeProps(config.defaultCellOptions.labelCell, options);
  return (
    <Box {...padding} textAlign={align}>
      <Label size={size} color={color}>
        {value}
      </Label>
    </Box>
  );
}

export function LinkCell({
  value,
  column: { align },
  options,
}: CellProps<{}, ComponentProps<typeof Link>> & {
  options: Partial<Pick<BodyProps, "size" | "weight">>;
}) {
  const config = useBentoConfig().table;
  const padding = config.padding.linkCell ?? config.padding.defaultCell;
  const { size, weight } = mergeProps(config.defaultCellOptions.linkCell, options);
  return (
    <Box {...padding} textAlign={align}>
      <Body size={size} weight={weight}>
        <Link {...value} />
      </Body>
    </Box>
  );
}

export function IconCell({
  value,
  column: { align },
  options,
}: CellProps<{}, { icon: (props: IconProps) => JSX.Element; label: LocalizedString }> & {
  options: Partial<Pick<IconProps, "size" | "color">>;
}) {
  const config = useBentoConfig().table;
  const { size, color } = mergeProps(config.defaultCellOptions.iconCell, options);
  const padding = config.padding.iconCell ?? config.padding.defaultCell;
  return (
    <Box {...padding} textAlign={align} aria-label={value.label}>
      {value.icon({ size, color })}
    </Box>
  );
}

export function IconButtonCell({
  value: iconButtonProps,
  column: { align },
  options,
}: CellProps<{}, Omit<IconButtonProps, "size" | "kind" | "hierarchy">> & {
  options: Partial<Pick<IconButtonProps, "size" | "kind" | "hierarchy">>;
}) {
  const config = useBentoConfig().table;
  const { size, hierarchy, kind } = mergeProps(config.defaultCellOptions.iconButtonCell, options);
  const padding = config.padding.iconButtonCell ?? config.padding.defaultCell;

  return (
    <Inset spaceX={padding.paddingX} spaceY={padding.paddingY}>
      <Inline space={0} align={align} alignY="center">
        <IconButton kind={kind} hierarchy={hierarchy} size={size} {...iconButtonProps} />
      </Inline>
    </Inset>
  );
}
