import { useLink } from "@react-aria/link";
import { AnchorHTMLAttributes, useRef } from "react";
import { Body, Label, LocalizedString, useLinkComponent } from "..";
import { Box, Columns, Column, Inset, Stack } from "../internal";
import { IconProps } from "../Icons/IconProps";
import { IllustrationProps } from "../Illustrations/IllustrationProps";
import { listItemRecipe } from "./ListItem.css";
import { ListSize } from "./createListComponents";
import { element } from "../reset.css";
import { ListItemConfig } from "./Config";

type Kind =
  | {
      kind: "overline";
      overline: LocalizedString;
      label: LocalizedString;
    }
  | {
      kind?: "single-line";
      label: LocalizedString;
    }
  | {
      kind: "two-line";
      label: LocalizedString;
      secondLine: LocalizedString;
    };

type LeftItem =
  | {
      icon?: never;
      illustration?: never;
    }
  | {
      icon: (props: IconProps) => JSX.Element;
      illustration?: never;
    }
  | {
      icon?: never;
      illustration: (props: IllustrationProps) => JSX.Element;
    };

type RightItem = {
  trailingIcon?: (props: IconProps) => JSX.Element;
};

type Props = Kind &
  LeftItem &
  RightItem & {
    disabled?: boolean;
    size?: ListSize;
    isFocused?: boolean;
    ignoreTabIndex?: boolean;
  } & (
    | {
        onPress?: () => void;
        href?: never;
        target?: never;
      }
    | {
        href?: string;
        target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
        onPress?: never;
      }
  );

export function createListItem(config: ListItemConfig) {
  return function ListItem(props: Props) {
    const linkRef = useRef<HTMLElement>(null);

    const {
      linkProps: { color, ...linkProps },
    } = useLink(
      {
        onPress: props.onPress,
        isDisabled: props.disabled,
        elementType: props.href ? "a" : "div",
      },
      linkRef
    );

    const LinkComponent = useLinkComponent();
    const interactive = !!props.onPress || !!props.href;

    return (
      <Box
        as="li"
        className={listItemRecipe({
          interactive,
          focused: !!props.isFocused,
        })}
        disabled={props.disabled}
      >
        <Box
          ref={linkRef}
          as={props.href ? LinkComponent.component : "div"}
          className={element.a}
          {...linkProps}
          href={props.href}
          target={props.target}
          display="block"
          tabIndex={interactive && !props.ignoreTabIndex ? linkProps.tabIndex : undefined}
        >
          <Inset spaceX={config.paddingX} spaceY={config.paddingY[props.size ?? "medium"]}>
            <Columns space={config.internalSpacing} alignY="center">
              {renderLeft(props)}
              {renderContent(props)}
              {renderRight(props)}
            </Columns>
          </Inset>
        </Box>
      </Box>
    );
  };

  function renderLeft(props: Props) {
    if (props.illustration) {
      return (
        <Column width="content">
          {props.illustration({
            size: config.iconSize.illustration,
            style: "outline",
            color: props.disabled ? "disabled" : "default",
          })}
        </Column>
      );
    }

    if (props.icon) {
      return (
        <Column width="content">
          {props.icon({
            size: config.iconSize.leading,
            color: props.disabled ? "disabled" : "default",
          })}
        </Column>
      );
    }

    return null;
  }

  function renderRight(props: Props) {
    if (props.trailingIcon) {
      return (
        <Column width="content">
          {props.trailingIcon({
            size: config.iconSize.trailing,
            color: props.disabled ? "disabled" : "default",
          })}
        </Column>
      );
    }

    return null;
  }

  function renderContent(props: Props) {
    switch (props.kind) {
      case "single-line":
      case undefined:
        return <SingleLine kind="single-line" {...props} />;
      case "two-line":
        return <TwoLine {...props} />;
      case "overline":
        return <Overline {...props} />;
    }
  }

  function SingleLine(props: Props & { kind: "single-line" }) {
    return (
      <Body size={config.fontSize.firstLine} color={props.disabled ? "disabled" : "default"}>
        {props.label}
      </Body>
    );
  }

  function TwoLine(props: Props & { kind: "two-line" }) {
    return (
      <Stack space={4} align="left">
        <Body size={config.fontSize.firstLine} color={props.disabled ? "disabled" : "default"}>
          {props.label}
        </Body>
        <Body size={config.fontSize.secondLine} color={props.disabled ? "disabled" : "secondary"}>
          {props.secondLine}
        </Body>
      </Stack>
    );
  }

  function Overline(props: Props & { kind: "overline" }) {
    return (
      <Stack space={4} align="left">
        <Label
          size={config.fontSize.overline}
          color={props.disabled ? "disabled" : "secondary"}
          uppercase
        >
          {props.overline}
        </Label>
        <Body size={config.fontSize.firstLine} color={props.disabled ? "disabled" : "default"}>
          {props.label}
        </Body>
      </Stack>
    );
  }
}

export type { Props as ListItemProps };
