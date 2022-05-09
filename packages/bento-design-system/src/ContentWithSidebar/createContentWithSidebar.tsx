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
    sidebarBackground?: BoxProps<AtomsFn>["background"];
    sidebarWidth?: ComponentProps<typeof Column>["width"] | { custom: string | number };
    sidebarAs?: BoxProps<AtomsFn>["as"];
    contentAs?: BoxProps<AtomsFn>["as"];
    sidebarPosition: "right" | "left";
  };

  return function ContentWithSidebar({
    space,
    children,
    sidebarWidth,
    sidebarBackground,
    sidebarPosition,
    sidebarAs,
    contentAs,
  }: Props) {
    const sidebarProps = (() => {
      if (typeof sidebarWidth === "object" && "custom" in sidebarWidth && sidebarWidth.custom) {
        return {
          style: { width: sidebarWidth.custom },
        };
      }

      const { desktop, tablet, mobile } = sidebarWidth
        ? normalizeResponsiveValue(
            sidebarWidth as OptionalResponsiveValue<keyof typeof desktopWidths>
          )
        : { desktop: undefined, tablet: undefined, mobile: undefined };

      const className =
        sidebarWidth == null
          ? fullWidth
          : [
              desktop && desktopWidths[desktop],
              tablet && tabletWidths[tablet],
              mobile && mobileWidths[mobile],
            ];

      return { className };
    })();

    const flexDirection = (() => {
      switch (sidebarPosition) {
        case "right":
          return "row";
        case "left":
          return "rowReverse";
      }
    })();

    return (
      <Box display="flex" height="full" gap={space} flexDirection={flexDirection}>
        <Box as={contentAs ?? "main"} flex={1}>
          {sidebarPosition === "left" ? children[1] : children[0]}
        </Box>
        <Box as={sidebarAs ?? "aside"} background={sidebarBackground} {...sidebarProps}>
          {sidebarPosition === "left" ? children[0] : children[1]}
        </Box>
      </Box>
    );
  };
}
