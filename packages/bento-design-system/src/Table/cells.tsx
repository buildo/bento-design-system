import { FunctionComponent } from "react";
import { CellProps } from "react-table";
import { ButtonLinkProps } from "../Button/ButtonLink";
import { LocalizedString, Body, ButtonProps, ChipProps, IconProps, Label } from "..";
import { Inline, Inset, Box } from "../internal";
import { IconButtonProps } from "../IconButton/createIconButton";
import { link, makeTextChildrenFromElements } from "../util/TextChildren";

export function createButtonCell(Button: FunctionComponent<ButtonProps>) {
  return function ButtonCell({
    value: buttonProps,
    column: { align },
  }: CellProps<{}, Omit<ButtonProps, "size">>) {
    return (
      <Inline space={0} align={align} alignY="center">
        <Button {...buttonProps} size="medium" />
      </Inline>
    );
  };
}

export function createButtonLinkCell(ButtonLink: FunctionComponent<ButtonLinkProps>) {
  return function ButtonLinkCell({
    value: buttonProps,
    column: { align },
  }: CellProps<{}, Omit<ButtonLinkProps, "size">>) {
    return (
      <Inline space={0} align={align}>
        <ButtonLink {...buttonProps} size="medium" />
      </Inline>
    );
  };
}

export function TextCell({ value, column: { align } }: CellProps<{}, LocalizedString>) {
  return (
    <Box padding={16} textAlign={align}>
      <Body size="medium">{value}</Body>
    </Box>
  );
}

export function TextWithIconCell({
  value: { icon, iconPosition, text },
  column: { align },
}: CellProps<
  {},
  {
    icon: FunctionComponent<IconProps> | null;
    iconPosition: "left" | "right";
    text: LocalizedString;
  }
>) {
  return (
    <Inset space={16}>
      <Inline space={8} alignY="center" align={align} reverse={iconPosition === "right"}>
        {icon && icon({ size: 12 })}
        <Body size="medium">{text}</Body>
      </Inline>
    </Inset>
  );
}

export function createChipCell<CustomColor extends string>(
  Chip: FunctionComponent<ChipProps<CustomColor>>
) {
  return function ChipCell({
    value: chipProps,
    column: { align },
  }: CellProps<{}, ChipProps<CustomColor>>) {
    return (
      <Inset space={16}>
        <Inline space={0} align={align} alignY="center">
          <Chip {...chipProps} />
        </Inline>
      </Inset>
    );
  };
}

export function LabelCell({ value, column: { align } }: CellProps<{}, LocalizedString>) {
  return (
    <Box padding={16} textAlign={align}>
      <Label size="large">{value}</Label>
    </Box>
  );
}

export function LinkCell({
  value: { label, href, isDisabled },
  column: { align },
}: CellProps<{}, { href: string; label: LocalizedString; isDisabled?: boolean }>) {
  return (
    <Box padding={16} textAlign={align}>
      <Label size="large">
        {makeTextChildrenFromElements(link(label, { href, disabled: isDisabled }))}
      </Label>
    </Box>
  );
}

export function IconCell({
  value,
  column: { align },
}: CellProps<{}, { icon: (props: IconProps) => JSX.Element; label: LocalizedString }>) {
  return (
    <Box padding={16} textAlign={align} aria-label={value.label}>
      {value.icon({ size: 16, color: "default" })}
    </Box>
  );
}

export function createIconButtonCell(IconButton: FunctionComponent<IconButtonProps>) {
  return function IconButtonCell({
    value: iconButtonProps,
    column: { align },
  }: CellProps<{}, Omit<IconButtonProps, "size" | "kind" | "hierarchy">>) {
    return (
      <Inline space={0} align={align} alignY="center">
        <IconButton kind="transparent" hierarchy="primary" {...iconButtonProps} size={16} />
      </Inline>
    );
  };
}
