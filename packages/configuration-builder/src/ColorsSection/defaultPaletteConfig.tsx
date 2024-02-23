import { HexColor, HexToHSL } from "../utils/colorUtils";
import { PaletteConfig } from "../utils/paletteUtils";

export function defaultPaletteConfig(hexValue: HexColor): PaletteConfig {
  const hslValue = HexToHSL(hexValue);
  return {
    referenceColor: hexValue,
    useReferenceAsKeyColor: true,
    hue: hslValue.h,
    saturation: hslValue.s,
    lightnessInterpolation: "EaseIn",
  };
}
