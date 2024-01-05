import { ColorConfig } from "../ColorEditor/ColorEditor";
import { HexColor, HexToHSL } from "../utils/colorUtils";

export function defaultColorConfig(hexValue: HexColor): ColorConfig {
  const hslValue = HexToHSL(hexValue);
  return {
    referenceColor: hexValue,
    useReferenceAsKeyColor: true,
    hue: hslValue.h,
    saturation: hslValue.s,
    lightnessInterpolation: "EaseIn",
  };
}
