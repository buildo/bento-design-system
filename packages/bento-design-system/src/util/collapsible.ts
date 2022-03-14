import { normalizeResponsiveValue, BentoSprinkles } from "../internal/sprinkles.css";
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

  const normalizedReverse = (() => {
    if (typeof reverse === "boolean") {
      return { desktop: reverse, tablet: reverse, mobile: reverse };
    }
    return reverse || {};
  })();

  const {
    desktop: reverseDesktop,
    tablet: reverseTablet = reverseDesktop,
    mobile: reverseMobile = reverseTablet,
  } = normalizedReverse;

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
      desktop: reverseDesktop ? "rowReverse" : "row",
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
      desktop: reverseDesktop ? invertAlignment(justifyContentDesktop) : justifyContentDesktop,
    },
    alignItems: {
      mobile: collapseMobile ? justifyContentMobile : alignItemsMobile,
      tablet: collapseTablet ? justifyContentTablet : alignItemsTablet,
      desktop: alignItemsDesktop,
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
