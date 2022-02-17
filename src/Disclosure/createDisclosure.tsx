import { usePress } from "@react-aria/interactions";
import { ComponentProps, useState } from "react";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { Children, IconChevronDown, IconChevronUp, LocalizedString, Title } from "..";
import { Box, Columns, Column, Stack, BentoSprinkles } from "../internal";
import { useId } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

type Props = {
  title: LocalizedString;
  level?: 1 | 2;
  children: Children;
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

type DisclosureConfig = {
  internalSpacing: BentoSprinkles["gap"];
  titleSize: {
    1: ComponentProps<typeof Title>["size"];
    2: ComponentProps<typeof Title>["size"];
  };
};

export function createDisclosure(
  config: DisclosureConfig = {
    internalSpacing: 16,
    titleSize: {
      1: "medium",
      2: "small",
    },
  }
) {
  return function Disclosure({
    title,
    isOpen,
    onToggle,
    level = 1,
    children,
    initialIsOpen,
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

    const Icon = open ? IconChevronUp : IconChevronDown;

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
          <Columns space={config.internalSpacing} alignY="center">
            <Column width="content">
              <Icon size={16} color={level === 1 ? "primary" : "secondary"} />
            </Column>
            <Title size={config.titleSize[level]}>{title}</Title>
          </Columns>
        </Box>
        <Box id={contentId} display={open ? undefined : "none"} aria-hidden={!open}>
          {children}
        </Box>
      </Stack>
    );
  };
}
