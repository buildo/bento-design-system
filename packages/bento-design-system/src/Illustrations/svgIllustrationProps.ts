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
  switch (size) {
    case 24:
      return { width: 24, height: 24 };
    case 32:
      return { width: 32, height: 32 };
    case 40:
      return { width: 40, height: 40 };
    case 80:
      return { width: 80, height: 80 };
    case 160:
      return { width: 160, height: 160 };
  }
}
