import { deepmerge } from "deepmerge-ts";
import { PartialDeep } from "./PartialDeep";
import { BentoTokens } from "./bentoTokens";
import { defaultTokens } from "./defaultTokens";
import { createTheme } from "@vanilla-extract/css";
import { vars } from "../vars.css";

export function makeBentoTheme(tokens: PartialDeep<BentoTokens>) {
  const themeTokens = deepmerge(defaultTokens, tokens) as BentoTokens;
  return createTheme(vars, themeTokens);
}
