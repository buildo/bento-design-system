import { BentoSprinkles } from "../internal";
import { normalizeResponsiveValue } from "../internal/sprinkles.css";
import { alignToFlexAlign, alignYToFlexAlign, ResponsiveAlign, ResponsiveAlignY } from "./align";
import { Breakpoint } from "./breakpoints";

export type CollapsibleAlignmentProps = {
  align?: ResponsiveAlign;
  alignY?: ResponsiveAlignY;
  collapseBelow?: Exclude<Breakpoint, "mobile">;
  reverse?: boolean | Partial<Record<Breakpoint, boolean>>;
};

export function responsiveCollapsibleAlignmentProps({
  align,
  alignY,
  collapseBelow,
  reverse,
}: CollapsibleAlignmentProps): Pick<
  BentoSprinkles,
  "flexDirection" | "justifyContent" | "alignItems"
> {
  const [collapseMobile, collapseTablet, collapseDesktop] = (() => {
    switch (collapseBelow) {
      case "wide":
        return [true, true, true];
      case "desktop":
        return [true, true, false];
      case "tablet":
        return [true, false, false];
      case undefined:
        return [false, false, false];
    }
  })();

  const normalizedReverse = (() => {
    if (typeof reverse === "boolean") {
      return { wide: reverse, desktop: reverse, tablet: reverse, mobile: reverse };
    }
    return reverse || {};
  })();

  const {
    wide: reverseWide,
    desktop: reverseDesktop,
    tablet: reverseTablet = reverseDesktop,
    mobile: reverseMobile = reverseTablet,
  } = normalizedReverse;

  const normalizedAlign = normalizeResponsiveValue(alignToFlexAlign(align) || "flexStart");
  const {
    wide: justifyContentWide,
    desktop: justifyContentDesktop = justifyContentWide,
    tablet: justifyContentTablet = justifyContentDesktop,
    mobile: justifyContentMobile = justifyContentTablet,
  } = normalizedAlign;

  const normalizedAlignY = normalizeResponsiveValue(alignYToFlexAlign(alignY) || "flexStart");
  const {
    wide: alignItemsWide,
    desktop: alignItemsDesktop = alignItemsWide,
    tablet: alignItemsTablet = alignItemsDesktop,
    mobile: alignItemsMobile = alignItemsTablet,
  } = normalizedAlignY;

  return {
    flexDirection: {
      mobile: collapseMobile
        ? reverseMobile
          ? "columnReverse"
          : "column"
        : reverseMobile
        ? "rowReverse"
        : "row",
      tablet: collapseTablet
        ? reverseTablet
          ? "columnReverse"
          : "column"
        : reverseTablet
        ? "rowReverse"
        : "row",
      desktop: collapseDesktop
        ? reverseDesktop
          ? "columnReverse"
          : "column"
        : reverseDesktop
        ? "rowReverse"
        : "row",
      wide: reverseWide ? "rowReverse" : "row",
    },
    justifyContent: {
      mobile: collapseMobile
        ? alignItemsMobile === "stretch"
          ? undefined
          : alignItemsMobile
        : reverseMobile
        ? invertAlignment(justifyContentMobile)
        : justifyContentMobile,
      tablet: collapseTablet
        ? alignItemsTablet === "stretch"
          ? undefined
          : alignItemsTablet
        : reverseTablet
        ? invertAlignment(justifyContentTablet)
        : justifyContentTablet,
      desktop: collapseDesktop
        ? alignItemsDesktop === "stretch"
          ? undefined
          : alignItemsDesktop
        : reverseDesktop
        ? invertAlignment(justifyContentDesktop)
        : justifyContentDesktop,
      wide: reverseWide ? invertAlignment(justifyContentWide) : justifyContentWide,
    },
    alignItems: {
      mobile: collapseMobile ? justifyContentMobile : alignItemsMobile,
      tablet: collapseTablet ? justifyContentTablet : alignItemsTablet,
      desktop: collapseDesktop ? justifyContentDesktop : alignItemsDesktop,
      wide: alignItemsWide,
    },
  };
}

function invertAlignment<Alignment extends string>(alignment: Alignment | undefined) {
  if (alignment === "flexStart") {
    return "flexEnd";
  }

  if (alignment === "flexEnd") {
    return "flexStart";
  }

  return alignment;
}
