import { Box, Columns, Column } from "../internal";
import { IconProps, IllustrationProps, Label, useLinkComponent } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { destinationRecipe } from "./Navigation.css";
import { AnchorHTMLAttributes, useRef } from "react";
import { useLink } from "@react-aria/link";
import { element } from "../reset.css";
import { NavigationConfig } from "./Config";

export type NavigationSize = "medium" | "large";

type Kind = "none" | "icon" | "illustration";

type DestinationIconProps<T extends Kind> = T extends "none"
  ? {
      icon?: never;
      illustration?: never;
    }
  : T extends "icon"
  ? {
      icon: (props: IconProps) => JSX.Element;
      illustration?: never;
    }
  : {
      icon?: never;
      illustration: (props: IllustrationProps) => JSX.Element;
    };

type Props<T extends Kind> = {
  kind: T;
  size: NavigationSize;
  destinations: Array<
    {
      href: string;
      target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
      label: LocalizedString;
      active?: boolean;
      disabled?: boolean;
    } & DestinationIconProps<T>
  >;
};

export function createNavigation(config: NavigationConfig) {
  type DestinationProps = {
    size: NavigationSize;
    label: LocalizedString;
    href: string;
    active?: boolean;
    disabled?: boolean;
    icon?: (props: IconProps) => JSX.Element;
    illustration?: (props: IllustrationProps) => JSX.Element;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  };
  function Destination({
    active = false,
    label,
    disabled,
    icon,
    illustration,
    size,
    href,
    target,
  }: DestinationProps) {
    const linkRef = useRef<HTMLElement>(null);

    const { linkProps } = useLink(
      {
        isDisabled: disabled,
        elementType: "a",
      },
      linkRef
    );

    const LinkComponent = useLinkComponent();

    return (
      <Box
        tabIndex={active || disabled ? -1 : 0}
        className={[destinationRecipe({ active }), element.a]}
        as={LinkComponent}
        {...linkProps}
        href={href}
        display="block"
        target={target}
        disabled={disabled}
        paddingX={config.destinationPaddingX[size]}
        paddingY={config.destinationPaddingY[size]}
      >
        <Columns space={config.internalSpacing[size]} alignY="center" align="center">
          {(icon || illustration) && (
            <Column width="content">
              {icon && icon({ size: config.iconSize[size], color: "inherit" })}
              {illustration &&
                illustration({
                  size: config.illustrationSize[size],
                  style: "outline",
                  color: "inherit",
                })}
            </Column>
          )}
          <Label size={config.labelSize[size]} uppercase={config.uppercaseLabel}>
            {label}
          </Label>
        </Columns>
        {active && config.activeVisualElement}
      </Box>
    );
  }

  return function Navigation<T extends Kind>({ destinations, size }: Props<T>) {
    return (
      <Columns space={config.destinationsSpacing}>
        {destinations.map((d) => {
          return (
            <Column key={d.label} width="content">
              <Destination
                label={d.label}
                href={d.href}
                target={d.target}
                active={d.active}
                disabled={d.disabled}
                size={size}
                icon={d.icon}
                illustration={d.illustration}
              />
            </Column>
          );
        })}
      </Columns>
    );
  };
}

export type { Props as NavigationProps };
