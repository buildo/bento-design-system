import { SVGProps } from "react";
import { iconRecipe } from "./Icon.css";
import { IconProps } from "./IconProps";

export function svgIconProps(
  { size, color = "default" }: IconProps,
  sizeAxis: "horizontal" | "vertical" = "horizontal"
): SVGProps<SVGSVGElement> {
  return {
    className:
      sizeAxis === "horizontal"
        ? iconRecipe({ width: size, color })
        : iconRecipe({ height: size, color }),
  };
}
