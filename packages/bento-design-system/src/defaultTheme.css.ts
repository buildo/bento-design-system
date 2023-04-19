import { createGlobalTheme } from "@vanilla-extract/css";
import { defaultTheme } from "./util/defaultTheme";
import { vars as bentoVars } from "./vars.css";

createGlobalTheme(":root", bentoVars, defaultTheme);
