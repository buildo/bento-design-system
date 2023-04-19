import { vars } from "./vars.css";
import { MapLeafNodes } from "@vanilla-extract/private";
import { PartialDeep } from "./util/PartialDeep";

export type BentoTheme = MapLeafNodes<typeof vars, string>;
export type PartialBentoTheme = PartialDeep<BentoTheme>;
