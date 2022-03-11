import { usePress } from "@react-aria/interactions";
import { Box, Columns, Column, BentoSprinkles, Inset } from "../internal";
import { IconProps, IllustrationProps, Label } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { destinationRecipe } from "./Navigation.css";
import { ComponentProps } from "react";

type DestinationProps = {
  size: Size;
  label: LocalizedString;
  onPress: () => void;
  active: boolean;
  disabled?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  illustration?: (props: IllustrationProps) => JSX.Element;
};

type Size = "medium" | "large";
type SizeConfig<A> = Record<Size, A>;

type NavigationConfig = {
  paddingX: BentoSprinkles["paddingX"];
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
    active,
    onPress,
    label,
    disabled,
    icon,
    illustration,
    size,
  }: DestinationProps) {
    const {
      pressProps: { color: ignored1, ...pressProps },
    } = usePress({ onPress, isDisabled: disabled });

    return (
      <Box
        tabIndex={active || disabled ? -1 : 0}
        className={destinationRecipe({ active })}
        {...pressProps}
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
          <Label size={config.labelSize[size]} uppercase>
            {label}
          </Label>
        </Columns>
        {active && config.activeVisualElement}
      </Box>
    );
  }

  type Props<A, T extends Kind> = {
    kind: T;
    size: Size;
    value: A;
    onChange: (v: A) => void;
    destinations: Array<
      {
        value: A;
        label: LocalizedString;
        disabled?: boolean;
      } & DestinationIconProps<T>
    >;
  };

  return function Navigation<A, T extends Kind>({
    value,
    destinations,
    onChange,
    size,
  }: Props<A, T>) {
    return (
      <Inset spaceX={config.paddingX}>
        <Columns space={config.destinationsSpacing}>
          {destinations.map((d) => {
            return (
              <Column key={d.label} width="content">
                <Destination
                  label={d.label}
                  onPress={() => onChange(d.value)}
                  active={value === d.value}
                  disabled={d.disabled}
                  size={size}
                  icon={d.icon}
                  illustration={d.illustration}
                />
              </Column>
            );
          })}
        </Columns>
      </Inset>
    );
  };
}

export const defaultNavigationConfig: NavigationConfig = {
  paddingX: 0,
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
