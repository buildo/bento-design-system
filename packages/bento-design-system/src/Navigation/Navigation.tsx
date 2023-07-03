import { Box, Columns, Column, IconProps, Label, useLinkComponent } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { destinationRecipe } from "./Navigation.css";
import { AnchorHTMLAttributes, useRef } from "react";
import { useLink } from "@react-aria/link";
import { element } from "../reset.css";
import { useBentoConfig } from "../BentoConfigContext";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

export type NavigationSize = "medium" | "large";

type Kind = "none" | "icon";

type DestinationIconProps<T extends Kind> = T extends "none"
  ? {
      icon?: never;
    }
  : {
      icon: (props: IconProps) => JSX.Element;
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

type DestinationProps = {
  size: NavigationSize;
  label: LocalizedString;
  href: string;
  active?: boolean;
  disabled?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};
function Destination({
  active = false,
  label,
  disabled,
  icon,
  size,
  href,
  target,
}: DestinationProps) {
  const config = useBentoConfig().navigation;
  const linkRef = useRef<HTMLElement>(null);

  const { linkProps } = useLink(
    {
      isDisabled: disabled,
      elementType: "a",
    },
    linkRef
  );

  const LinkComponent = useLinkComponent();

  const activeElement =
    "props" in config.activeVisualElement ? (
      config.activeVisualElement
    ) : (
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={config.activeVisualElement.lineOffset[size]}
        background="currentColor"
        color={config.activeVisualElement.lineColor}
        style={{
          height: config.activeVisualElement.lineHeight[size],
          width: config.activeVisualElement.lineWidth[size],
          margin: "0 auto",
        }}
      />
    );

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
      {...getRadiusPropsFromConfig(config.radius[size])}
    >
      <Columns space={config.internalSpacing[size]} alignY="center" align="center">
        {icon && (
          <Column width="content">{icon({ size: config.iconSize[size], color: "inherit" })}</Column>
        )}
        <Label size={config.labelSize[size]} uppercase={config.uppercaseLabel}>
          {label}
        </Label>
      </Columns>
      {active && activeElement}
    </Box>
  );
}

export function Navigation<T extends Kind>({ destinations, size }: Props<T>) {
  const config = useBentoConfig().navigation;
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
            />
          </Column>
        );
      })}
    </Columns>
  );
}

export type { Props as NavigationProps };
