import { ColorConfig } from "../ColorEditor/ColorEditor";
import { HexColor, HexToHSL } from "../utils/colorUtils";

export function defaultColorConfig(hexValue: HexColor): ColorConfig {
  const hslValue = HexToHSL(hexValue);
  return {
    keyColor: hexValue,
    hue: hslValue.h,
    saturation: hslValue.s,
    lightnessInterpolation: "EaseIn",
    keyColorLocked: true,
  };
}
