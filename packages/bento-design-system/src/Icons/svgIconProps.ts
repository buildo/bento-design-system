import { PropsWithoutRef, SVGProps } from "react";
import { iconRecipe } from "./Icon.css";
import { IconProps } from "./IconProps";

export function svgIconProps(
  { size, color = "default" }: IconProps,
  sizeAxis: "horizontal" | "vertical" = "horizontal"
): PropsWithoutRef<SVGProps<SVGSVGElement>> {
  return {
    className:
      sizeAxis === "horizontal"
        ? iconRecipe({ width: size, color })
        : iconRecipe({ height: size, color }),
    viewBox: "0 0 24 24",
  };
}
