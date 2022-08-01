import { SVGAttributes } from "react";
import { vars } from "../vars.css";
import { IllustrationProps } from "./IllustrationProps";

export function svgIllustrationProps(props: IllustrationProps): SVGAttributes<SVGElement> {
  return {
    ...sizeToDimensions(props.size),
    fill: props.style === "outline" ? outlineColor(props.color) : undefined,
    viewBox: "0 0 80 80",
  };
}

function outlineColor(color: (IllustrationProps & { style: "outline" })["color"]): string {
  switch (color) {
    case "default":
      return vars.foregroundColor.foregroundSecondary;
    case "disabled":
      return vars.foregroundColor.foregroundDisabled;
    case "inherit":
      return "inherit";
  }
}

function sizeToDimensions(size: IllustrationProps["size"]): { width: number; height: number } {
  const s = typeof size === "object" ? size.custom : size;
  return { width: s, height: s };
}
