import { normalizeResponsiveValue, Sprinkles } from "../sprinkles.css";
import { alignToFlexAlign, alignYToFlexAlign, ResponsiveAlign, ResponsiveAlignY } from "./align";
import { Breakpoint } from "./breakpoints";

export type CollapsibleAlignmentProps = {
  align?: ResponsiveAlign;
  alignY?: ResponsiveAlignY;
  collapseBelow?: Exclude<Breakpoint, "mobile">;
};

export function responsiveCollapsibleAlignmentProps({
  align,
  alignY,
  collapseBelow,
}: CollapsibleAlignmentProps): Pick<Sprinkles, "flexDirection" | "justifyContent" | "alignItems"> {
  const [collapseMobile, collapseTablet] = (() => {
    switch (collapseBelow) {
      case "desktop":
        return [true, true];
      case "tablet":
        return [true, false];
      case undefined:
        return [false, false];
    }
  })();

  const normalizedAlign = normalizeResponsiveValue(alignToFlexAlign(align) || "flexStart");
  const {
    desktop: justifyContentDesktop,
    tablet: justifyContentTablet = justifyContentDesktop,
    mobile: justifyContentMobile = justifyContentTablet,
  } = normalizedAlign;

  const normalizedAlignY = normalizeResponsiveValue(alignYToFlexAlign(alignY) || "flexStart");
  const {
    desktop: alignItemsDesktop,
    tablet: alignItemsTablet = alignItemsDesktop,
    mobile: alignItemsMobile = alignItemsTablet,
  } = normalizedAlignY;

  return {
    flexDirection: {
      mobile: collapseMobile ? "column" : "row",
      tablet: collapseTablet ? "column" : "row",
      desktop: "row",
    },
    justifyContent: {
      mobile: collapseMobile
        ? alignItemsMobile === "stretch"
          ? undefined
          : alignItemsMobile
        : justifyContentMobile,
      tablet: collapseTablet
        ? alignItemsTablet === "stretch"
          ? undefined
          : alignItemsTablet
        : justifyContentTablet,
      desktop: justifyContentDesktop,
    },
    alignItems: {
      mobile: collapseMobile ? justifyContentMobile : alignItemsMobile,
      tablet: collapseTablet ? justifyContentTablet : alignItemsTablet,
      desktop: alignItemsDesktop,
    },
  };
}
