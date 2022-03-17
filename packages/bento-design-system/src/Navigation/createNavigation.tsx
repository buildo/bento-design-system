import { Box, Columns, Column, BentoSprinkles } from "../internal";
import { IconProps, IllustrationProps, Label, useLinkComponent } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { destinationRecipe } from "./Navigation.css";
import { AnchorHTMLAttributes, ComponentProps, useRef } from "react";
import { useLink } from "@react-aria/link";

type DestinationProps = {
  size: Size;
  label: LocalizedString;
  href: string;
  active?: boolean;
  disabled?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  illustration?: (props: IllustrationProps) => JSX.Element;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type Size = "medium" | "large";
type SizeConfig<A> = Record<Size, A>;

type NavigationConfig = {
  destinationsSpacing: BentoSprinkles["gap"];
  destinationPaddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  destinationPaddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: SizeConfig<ComponentProps<typeof Label>["size"]>;
  iconSize: SizeConfig<IconProps["size"]>;
  illustrationSize: SizeConfig<IllustrationProps["size"]>;
  internalSpacing: SizeConfig<BentoSprinkles["gap"]>;
  activeVisualElement: JSX.Element;
};

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

export function createNavigation(config: NavigationConfig) {
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

    const {
      linkProps: { color, ...linkProps },
    } = useLink(
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
        className={destinationRecipe({ active })}
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
          <Label size={config.labelSize[size]}>{label}</Label>
        </Columns>
        {active && config.activeVisualElement}
      </Box>
    );
  }

  type Props<T extends Kind> = {
    kind: T;
    size: Size;
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

export const defaultNavigationConfig: NavigationConfig = {
  destinationPaddingX: {
    medium: 16,
    large: 24,
  },
  destinationPaddingY: {
    medium: 8,
    large: 16,
  },
  destinationsSpacing: 0,
  iconSize: {
    medium: 16,
    large: 16,
  },
  illustrationSize: {
    medium: 24,
    large: 24,
  },
  internalSpacing: {
    medium: 8,
    large: 8,
  },
  labelSize: {
    medium: "large",
    large: "large",
  },
  activeVisualElement: (
    <Box
      position="absolute"
      left={0}
      bottom={0}
      background="brandPrimary"
      width="full"
      style={{ height: 2 }}
    />
  ),
};
