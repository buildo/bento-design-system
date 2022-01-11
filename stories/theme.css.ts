import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "../src/vars.css";

createGlobalTheme(":root", vars, {
  fontFamily: {
    default: "Arial",
  },
  color: {
    primary: "#F05D68",
    neutral: "#E4E8EE",
  },
  space: {
    0: "0",
    4: "4px",
    8: "8px",
    16: "16px",
    24: "24px",
    32: "32px",
    40: "40px",
    80: "80px",
  },
});

export const myVars = createGlobalTheme(":root", {
  fontFamily: {
    customFontFamily: "sans-serif",
  },
  color: {
    customColor1: "#3C6FD6",
  },
  space: {
    12: "12px",
  },
});
