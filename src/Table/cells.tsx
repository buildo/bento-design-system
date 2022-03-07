import { FunctionComponent } from "react";
import { CellProps } from "react-table";
import { ButtonLinkProps } from "../Button/ButtonLink";
import { LocalizedString, Body, ButtonProps, ChipProps, IconProps, Label, LinkProps } from "..";
import { Inline, Inset, Box } from "../internal";

export function createButtonCell(Button: FunctionComponent<ButtonProps>) {
  return function ButtonCell({
    value: buttonProps,
    column: { align },
  }: CellProps<{}, Omit<ButtonProps, "size">>) {
    return (
      <Inline space={0} align={align} alignY="center">
        <Button {...buttonProps} size="small" />
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
        <ButtonLink {...buttonProps} size="small" />
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

export function createLinkCell(Link: FunctionComponent<LinkProps>) {
  return function LinkCell({
    value,
    column: { align },
  }: CellProps<{}, { href: string; label: LocalizedString; isDisabled?: boolean }>) {
    return (
      <Box padding={16} textAlign={align}>
        <Link {...value} />
      </Box>
    );
  };
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
