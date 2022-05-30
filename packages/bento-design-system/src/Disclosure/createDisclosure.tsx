import { usePress } from "@react-aria/interactions";
import { useState } from "react";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { Children, LocalizedString, Title } from "..";
import { Box, Columns, Column, Stack } from "../internal";
import { useId } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { DisclosureConfig } from "./Config";

type Props = {
  title: LocalizedString;
  level?: 1 | 2;
  children: Children;
  iconPosition?: "leading" | "trailing";
} & (
  | {
      isOpen: boolean;
      onToggle: (isOpen: boolean) => void;
      initialIsOpen?: never;
    }
  | {
      isOpen?: never;
      onToggle?: never;
      initialIsOpen?: boolean;
    }
);

export function createDisclosure(config: DisclosureConfig) {
  return function Disclosure({
    title,
    isOpen,
    onToggle,
    level = 1,
    children,
    initialIsOpen,
    iconPosition = config.defaultIconPosition,
  }: Props) {
    const [internalIsOpen, setInternalIsOpen] = useState(isOpen ?? initialIsOpen);
    const open = internalIsOpen ?? isOpen;
    const onPress = onToggle ? () => onToggle(!isOpen) : () => setInternalIsOpen(!internalIsOpen);
    const {
      pressProps: { color: _discard1, ...pressProps },
    } = usePress({ onPress });
    const contentId = useId();
    const {
      focusProps: { color: _discard2, ...focusProps },
      isFocusVisible,
    } = useFocusRing();

    const icon = open ? config.icons.open : config.icons.closed;

    return (
      <Stack space={16}>
        <Box
          {...focusProps}
          {...pressProps}
          role="button"
          tabIndex={0}
          outline={isFocusVisible ? undefined : "none"}
          className={extendedHitAreaRecipe({ axis: "y" })}
          cursor="pointer"
          aria-expanded={open}
          aria-controls={contentId}
        >
          <Columns
            space={config.internalSpacing}
            alignY="center"
            reverse={iconPosition === "trailing"}
          >
            <Column width="content">
              {icon({ size: 16, color: level === 1 ? "primary" : "secondary" })}
            </Column>
            <Title size={config.titleSize[level]} color={level === 1 ? "default" : "secondary"}>
              {title}
            </Title>
          </Columns>
        </Box>
        <Box id={contentId} display={open ? undefined : "none"} aria-hidden={!open}>
          {children}
        </Box>
      </Stack>
    );
  };
}

export type { Props as DisclosureProps };
