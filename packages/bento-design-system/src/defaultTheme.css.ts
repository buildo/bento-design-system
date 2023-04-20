import { createGlobalTheme } from "@vanilla-extract/css";
import { defaultTokens } from "./util/defaultTokens";
import { vars as bentoVars } from "./vars.css";

createGlobalTheme(":root", bentoVars, defaultTokens);
