import { useLink } from "@react-aria/link";
import { AnchorHTMLAttributes, useRef } from "react";
import {
  Body,
  Label,
  LocalizedString,
  useLinkComponent,
  Box,
  Columns,
  Column,
  Inset,
  Stack,
} from "..";
import { IconProps } from "../Icons/IconProps";
import { IllustrationProps } from "../Illustrations/IllustrationProps";
import { listItemRecipe } from "./ListItem.css";
import { ListSize } from "./List";
import { element } from "../reset.css";
import { Children } from "../util/Children";
import { useBentoConfig } from "../BentoConfigProvider";

type Kind =
  | {
      kind: "overline";
      overline: LocalizedString;
      label: Children;
    }
  | {
      kind?: "single-line";
      label: Children;
    }
  | {
      kind: "two-line";
      label: Children;
      secondLine: Children;
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
    size: ListSize;
    isFocused?: boolean;
    isSelected?: boolean;
    ignoreTabIndex?: boolean;
    key?: string | number;
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

export function ListItem(props: Props) {
  const config = useBentoConfig().list.item;
  const linkRef = useRef<HTMLElement>(null);

  const { linkProps } = useLink(
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
        selected: !!props.isSelected,
      })}
      disabled={props.disabled}
    >
      <Box
        ref={linkRef}
        as={props.href ? LinkComponent : "div"}
        className={element.a}
        {...linkProps}
        href={props.href}
        target={props.target}
        display="block"
        tabIndex={interactive && !props.ignoreTabIndex ? linkProps.tabIndex : undefined}
      >
        <Inset spaceX={config.paddingX[props.size]} spaceY={config.paddingY[props.size]}>
          <Columns space={config.internalSpacing} alignY="center">
            <Left {...props} />
            <Content {...props} />
            <Right {...props} />
          </Columns>
        </Inset>
      </Box>
    </Box>
  );
}

function Left(props: Props) {
  const config = useBentoConfig().list.item;
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

function Right(props: Props) {
  const config = useBentoConfig().list.item;
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

function Content(props: Props) {
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
  const config = useBentoConfig().list.item;
  return (
    <Body size={config.fontSize.firstLine} color={props.disabled ? "disabled" : "default"}>
      {props.label}
    </Body>
  );
}

function TwoLine(props: Props & { kind: "two-line" }) {
  const config = useBentoConfig().list.item;
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
  const config = useBentoConfig().list.item;
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

export type { Props as ListItemProps };