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
}: CellProps<any, Omit<ButtonProps, "size">> & {
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
}: CellProps<any, Omit<ButtonLinkProps, "size">> & {
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

type TextCellValue =
  | LocalizedString
  | ({ text: LocalizedString } & Partial<Pick<BodyProps, "size" | "weight" | "color" | "align">>);
export function TextCell({
  value,
  column,
  options,
}: CellProps<any, TextCellValue> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">>;
}) {
  const config = useBentoConfig().table;
  const padding = config.padding.textCell ?? config.padding.defaultCell;
  const cellOptions: Omit<TextCellValue, "text"> = typeof value === "string" ? {} : value;

  const { size, weight, color, align } = mergeProps(
    column,
    config.defaultCellOptions.textCell,
    options,
    cellOptions
  );
  return (
    <Box {...padding} textAlign={align}>
      <Body size={size} weight={weight} color={color}>
        {typeof value === "string" ? value : value.text}
      </Body>
    </Box>
  );
}

export function TextWithIconCell({
  value: { icon, iconPosition, text, tooltipContent, ...cellOptions },
  column: { align },
  options,
}: CellProps<
  any,
  {
    icon: ((props: IconProps) => Children) | null;
    iconPosition: "left" | "right";
    text: LocalizedString;
    tooltipContent?: Children;
  } & Partial<Pick<BodyProps, "size" | "weight" | "color">>
> & {
  options: Partial<Pick<BodyProps, "size" | "weight" | "color">> & {
    iconSize?: IconProps["size"];
    iconColor?: IconProps["color"];
  };
}) {
  const config = useBentoConfig().table;
  const { size, weight, color, iconSize, iconColor } = mergeProps(
    config.defaultCellOptions.textWithIconCell,
    options,
    cellOptions
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

export function ChipCell({ value: chipProps, column: { align } }: CellProps<any, ChipProps>) {
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

type LabelCellValue =
  | LocalizedString
  | ({ text: LocalizedString } & Partial<Pick<LabelProps, "size" | "color" | "align">>);
export function LabelCell({
  value,
  column,
  options,
}: CellProps<any, LabelCellValue> & {
  options: Partial<Pick<LabelProps, "size" | "color">>;
}) {
  const config = useBentoConfig().table;
  const padding = config.padding.labelCell ?? config.padding.defaultCell;
  const cellOptions = typeof value === "string" ? {} : value;

  const { size, color, align } = mergeProps(
    column,
    config.defaultCellOptions.labelCell,
    options,
    cellOptions
  );
  return (
    <Box {...padding} textAlign={align}>
      <Label size={size} color={color}>
        {typeof value === "string" ? value : value.text}
      </Label>
    </Box>
  );
}

export function LinkCell({
  value,
  column: { align },
  options,
}: CellProps<any, ComponentProps<typeof Link>> & {
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
}: CellProps<any, { icon: (props: IconProps) => JSX.Element; label: LocalizedString }> & {
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
}: CellProps<any, Omit<IconButtonProps, "size" | "kind" | "hierarchy">> & {
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
