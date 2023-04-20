import { createTheme } from "@vanilla-extract/css";
import { defaultTokens } from "./util/defaultTokens";
import { vars as bentoVars } from "./vars.css";

export const defaultTheme = createTheme(bentoVars, defaultTokens);
