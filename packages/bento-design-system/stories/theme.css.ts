import { createGlobalTheme } from "@vanilla-extract/css";

export const customVars = createGlobalTheme(":root", {
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
