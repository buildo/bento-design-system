import { createGlobalTheme } from "@vanilla-extract/css";
import { defaultThemeConsts } from "./util/defaultThemeConsts";
import { vars as bentoVars } from "./vars.css";

createGlobalTheme(":root", bentoVars, defaultThemeConsts);
