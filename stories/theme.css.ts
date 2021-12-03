import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "../src/vars.css";

createGlobalTheme(":root", vars, {
  fontFamily: {
    default: "Arial",
  },
});
