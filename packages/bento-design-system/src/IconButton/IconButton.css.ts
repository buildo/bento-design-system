import { style } from "@vanilla-extract/css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const iconButton = style([extendedHitAreaRecipe({ axis: "both" }), { lineHeight: 0 }]);
