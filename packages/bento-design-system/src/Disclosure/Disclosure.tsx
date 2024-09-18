import { usePress } from "@react-aria/interactions";
import { useState } from "react";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { Children, LocalizedString, Title, Box, Columns, Column, Stack } from "..";
import { useId } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { useBentoConfig } from "../BentoConfigContext";

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

export function Disclosure({
  title,
  isOpen,
  onToggle,
  level = 1,
  children,
  initialIsOpen,
  iconPosition: iconPosition_,
}: Props) {
  const config = useBentoConfig().disclosure;
  const iconPosition = iconPosition_ ?? config.defaultIconPosition;

  const [internalIsOpen, setInternalIsOpen] = useState(isOpen ?? initialIsOpen);
  const open = internalIsOpen ?? isOpen;
  const onPress = onToggle ? () => onToggle(!isOpen) : () => setInternalIsOpen(!internalIsOpen);
  const { pressProps } = usePress({ onPress });
  const contentId = useId();
  const { focusProps, isFocusVisible } = useFocusRing();

  const icon = open ? config.icons.open : config.icons.closed;

  return (
    <Stack space={config.titleSpacing}>
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
            {icon({ size: config.iconSize[level], color: level === 1 ? "primary" : "secondary" })}
          </Column>
          <Title size={config.titleSize[level]} color={level === 1 ? "primary" : "secondary"}>
            {title}
          </Title>
        </Columns>
      </Box>
      <Box id={contentId} display={open ? undefined : "none"} aria-hidden={!open}>
        {children}
      </Box>
    </Stack>
  );
}

export type { Props as DisclosureProps };
