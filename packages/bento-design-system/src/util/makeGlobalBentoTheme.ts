import { deepmerge } from "deepmerge-ts";
import { PartialDeep } from "./PartialDeep";
import { BentoTokens } from "./bentoTokens";
import { defaultTokens } from "./defaultTokens";
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "../vars.css";

export function makeGlobalBentoTheme(tokens: PartialDeep<BentoTokens>) {
  const themeTokens = deepmerge(defaultTokens, tokens) as BentoTokens;
  createGlobalTheme(":root", vars, themeTokens);
}
