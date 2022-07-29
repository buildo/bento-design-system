import { AnchorHTMLAttributes, useRef } from "react";
import { buttonRecipe } from "../Button/Button.css";
import { useLinkComponent } from "../util/link";
import { ButtonProps } from "./createButton";
import { Label } from "..";
import { Box, Column, Columns } from "../internal";
import { useLink } from "@react-aria/link";
import { element } from "../reset.css";
import { ButtonConfig } from "./Config";
import { IconProps } from "../Icons";

type Props = {
  href: string;
  label: ButtonProps["label"];
  kind: ButtonProps["kind"];
  hierarchy: ButtonProps["hierarchy"];
  isDisabled?: ButtonProps["isDisabled"];
  size?: ButtonProps["size"];
  active?: boolean;
  icon?: (props: IconProps) => JSX.Element;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function createButtonLink(config: ButtonConfig) {
  return function ButtonLink({
    href,
    target,
    kind,
    hierarchy,
    size = config.defaultSize,
    isDisabled,
    label,
    active = false,
    ...props
  }: Props) {
    const LinkComponent = useLinkComponent();
    const ref = useRef<HTMLAnchorElement>(null);
    const { linkProps } = useLink(
      {
        isDisabled,
        // NOTE(gabro): using anything other than 'a' so that we set the correct accessibility props
        elementType: "span",
      },
      ref
    );

    return (
      <Box
        {...linkProps}
        {...props}
        as={LinkComponent}
        href={href}
        target={target}
        className={[buttonRecipe({ kind, hierarchy, size, active }), element.a]}
        disabled={isDisabled}
        display="inline-block"
        paddingX={config.paddingX[size]}
        paddingY={config.paddingY[size]}
        borderRadius={config.radius}
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
          <Label as="span" size={config.labelSize} uppercase={config.uppercaseLabel}>
            {label}
          </Label>
        </Columns>
      </Box>
    );
  };
}

export type { Props as ButtonLinkProps };
