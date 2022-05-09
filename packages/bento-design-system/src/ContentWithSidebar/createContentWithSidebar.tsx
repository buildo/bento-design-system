import { BoxProps, BoxType } from "../Box/createBentoBox";
import {
  bentoSprinkles,
  normalizeResponsiveValue,
  OptionalResponsiveValue,
} from "../internal/sprinkles.css";
import { desktopWidths, tabletWidths, mobileWidths, fullWidth } from "../Layout/Column.css";
import { Children } from "../util/Children";
import { Column } from "../internal";
import { ComponentProps } from "react";

export function createContentWithSidebar<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>
) {
  type Props = {
    children: [Children, Children];
    space?: BoxProps<AtomsFn>["gap"];
    sidebar: {
      background?: BoxProps<AtomsFn>["background"];
      width: ComponentProps<typeof Column>["width"] | { custom: string | number };
      as?: BoxProps<AtomsFn>["as"];
    };
    content?: {
      as?: BoxProps<AtomsFn>["as"];
    };
  };

  return function ContentWithSidebar({ space, children, content, sidebar }: Props) {
    const sidebarProps = (() => {
      if (typeof sidebar.width === "object" && "custom" in sidebar.width && sidebar.width.custom) {
        return {
          style: { width: sidebar.width.custom },
        };
      }

      const sidebarWidth = sidebar.width as OptionalResponsiveValue<keyof typeof desktopWidths>;

      const { desktop, tablet, mobile } = sidebarWidth
        ? normalizeResponsiveValue(sidebarWidth)
        : { desktop: undefined, tablet: undefined, mobile: undefined };

      const className =
        sidebar.width == null
          ? fullWidth
          : [
              desktop && desktopWidths[desktop],
              tablet && tabletWidths[tablet],
              mobile && mobileWidths[mobile],
            ];

      return { className };
    })();

    return (
      <Box display="flex" height="full" gap={space}>
        <Box as={content?.as ?? "main"} flex={1}>
          {children[0]}
        </Box>
        <Box as={content?.as ?? "aside"} background={sidebar.background} {...sidebarProps}>
          {children[1]}
        </Box>
      </Box>
    );
  };
}
