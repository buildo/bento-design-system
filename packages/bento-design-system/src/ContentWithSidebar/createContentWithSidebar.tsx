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

/**
 * A component that renders a main content and a sidebar on the side.
 *
 * The main content is always rendered before the sidebar in the DOM, so that tab and focus order goes to the main content first.
 */
export function createContentWithSidebar<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>
) {
  type Props = {
    /**
     * Main content and sidebar to render. The order depends on the sidebar position:
     * - "left" -> [sidebar, content]
     * - "right" -> [content, sidebar]
     */
    children: [Children, Children];
    /**
     * The placement of the sidebar relative to the content. Note that this is purely visual and it does not affect the
     * DOM order: the content always comes first in the DOM, so that it receives focus first when navigating with a
     * keyboard or a screen reader.
     */
    sidebarPosition: "right" | "left";
    /**
     * Width of the sidebar. It can be a shortcut width like with `<Columns>` (e.g. "1/5") or a completely custom width.
     * Examples:
     *
     * ```tsx
     *  <ContentWithSidebar sidebarPosition="right" sidebarWidth="1/5">...</ContentWithSidebar>
     *  <ContentWithSidebar  sidebarPosition="right" sidebarWidth={{ custom: "25%" }}>...</ContentWithSidebar>
     * ```
     */
    sidebarWidth: ComponentProps<typeof Column>["width"] | { custom: string | number };
    /**
     * Horizontal space between the content and the sidebar. Defaults to no content.
     */
    space?: BoxProps<AtomsFn>["gap"];
    /**
     * Background of the sidebar container, defaults to no background.
     */
    sidebarBackground?: BoxProps<AtomsFn>["background"];
    /**
     * Native dom element for the sidebar.
     * @default <aside>
     */
    sidebarAs?: BoxProps<AtomsFn>["as"];
    /**
     * Native dom element for the content.
     * @default <main>
     */
    contentAs?: BoxProps<AtomsFn>["as"];
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
